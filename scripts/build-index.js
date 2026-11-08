#!/usr/bin/env node
/**
 * 扫描各类目目录下的题解 Markdown，解析 front-matter，
 * 重新生成 README.md 中 <!-- INDEX:START --> 与 <!-- INDEX:END --> 之间的目录索引。
 *
 * 用法：node scripts/build-index.js
 * 零依赖，仅需 Node.js >= 16。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const README_PATH = path.join(ROOT, 'README.md');
const MARK_START = '<!-- INDEX:START -->';
const MARK_END = '<!-- INDEX:END -->';
const SKIP_DIRS = new Set(['template', 'scripts', '.github', 'node_modules']);
const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 };
const DIFF_BADGE = { easy: '🟢 简单', medium: '🟡 中等', hard: '🔴 困难' };

/** 解析 front-matter（支持字符串与 [a, b] 数组两种值） */
function parseFrontMatter(content, file) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    console.warn(`⚠ 跳过（缺少 front-matter）: ${file}`);
    return null;
  }
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+)\s*:\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let value = kv[2].trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      meta[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      meta[key] = value.replace(/^["']|["']$/g, '');
    }
  }
  if (!meta.id || !meta.title) {
    console.warn(`⚠ 跳过（缺少 id/title）: ${file}`);
    return null;
  }
  return meta;
}

/** 收集所有类目及其题解 */
function collectCategories() {
  const categories = [];
  for (const name of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (!name.isDirectory() || name.name.startsWith('.') || SKIP_DIRS.has(name.name)) continue;
    const dir = path.join(ROOT, name.name);
    const problems = [];
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.md')) continue;
      const rel = path.join(name.name, f).split(path.sep).join('/');
      const meta = parseFrontMatter(fs.readFileSync(path.join(dir, f), 'utf8'), rel);
      if (meta) problems.push({ rel, meta });
    }
    if (problems.length) {
      problems.sort((a, b) => a.meta.id - b.meta.id);
      categories.push({ name: name.name, problems });
    }
  }
  return categories;
}

/** 生成目录索引 Markdown */
function buildIndex(categories) {
  const stats = { easy: 0, medium: 0, hard: 0 };
  const lines = [];

  for (const { name, problems } of categories) {
    for (const p of problems) {
      const d = (p.meta.difficulty || '').toLowerCase();
      if (d in stats) stats[d]++;
    }
  }

  const total = stats.easy + stats.medium + stats.hard;
  lines.push(`> 已完成 **${total}** 题：${DIFF_BADGE.easy} ${stats.easy} · ${DIFF_BADGE.medium} ${stats.medium} · ${DIFF_BADGE.hard} ${stats.hard}`);
  lines.push('');

  for (const { name, problems } of categories) {
    lines.push(`## ${name}`);
    lines.push('');
    lines.push('| # | 题目 | 难度 | 标签 | 日期 | 掘金 |');
    lines.push('| - | --- | ---- | ---- | ---- | ---- |');
    for (const { rel, meta } of problems) {
      const d = (meta.difficulty || '').toLowerCase();
      const difficulty = DIFF_BADGE[d] || meta.difficulty || '-';
      const tags = Array.isArray(meta.tags) ? meta.tags.join(' / ') : meta.tags || '-';
      const juejin = meta.juejin ? `[文章](${meta.juejin})` : '-';
      lines.push(`| ${meta.id} | [${meta.title}](${rel}) | ${difficulty} | ${tags} | ${meta.date || '-'} | ${juejin} |`);
    }
    lines.push('');
  }

  return lines.join('\n').trimEnd() + '\n';
}

function main() {
  const categories = collectCategories();
  if (!categories.length) {
    console.log('暂无题解，索引为空。');
  }

  const index = buildIndex(categories);
  let readme = fs.readFileSync(README_PATH, 'utf8');
  const start = readme.indexOf(MARK_START);
  const end = readme.indexOf(MARK_END);

  if (start === -1 || end === -1) {
    readme = `${readme.trimEnd()}\n\n${MARK_START}\n${index}${MARK_END}\n`;
  } else {
    readme = readme.slice(0, start + MARK_START.length) + '\n' + index + readme.slice(end);
  }

  fs.writeFileSync(README_PATH, readme, 'utf8');

  // 同步输出 index.json，供个人主页等外部站点消费
  const stats = { easy: 0, medium: 0, hard: 0 };
  for (const { problems } of categories) {
    for (const p of problems) {
      const d = (p.meta.difficulty || '').toLowerCase();
      if (d in stats) stats[d]++;
    }
  }
  const manifest = {
    generatedAt: new Date().toISOString(),
    total: stats.easy + stats.medium + stats.hard,
    stats,
    categories: categories.map(({ name, problems }) => ({
      name,
      problems: problems.map(({ rel, meta }) => ({
        id: meta.id,
        title: meta.title,
        difficulty: meta.difficulty || '',
        tags: meta.tags || [],
        date: meta.date || '',
        juejin: meta.juejin || '',
        file: rel
      }))
    }))
  };
  fs.writeFileSync(path.join(ROOT, 'index.json'), JSON.stringify(manifest, null, 2), 'utf8');

  const count = categories.reduce((n, c) => n + c.problems.length, 0);
  console.log(`✓ 目录索引已更新：${categories.length} 个类目，共 ${count} 题（README.md + index.json）`);
}

main();
