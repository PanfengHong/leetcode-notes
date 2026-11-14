# LeetCode 算法笔记

LeetCode 刷题题解仓库，按类目分目录、每题一个 Markdown 文件，front-matter 维护元数据。

> 本 README 的「目录索引」部分由脚本自动生成，请勿手改标记之间的内容。

## 目录约定

| 类目 | 目录 |
| --- | --- |
| Top 100 | `top-100/` |
| 排序 | `sort/` |

- 文件命名：`题号-题名slug.md`，如 `001-two-sum.md`
- 新增题解：复制 `template/problem.md`，填写 front-matter 与正文
- front-matter 字段：`id`（题号）、`title`、`difficulty`（easy/medium/hard）、`tags`、`date`、`juejin`（掘金文章链接）

## 更新目录索引

新增或修改题解后，在仓库根目录执行：

```bash
node scripts/build-index.js
```

<!-- INDEX:START -->
> 已完成 **2** 题：🟢 简单 1 · 🟡 中等 1 · 🔴 困难 0

## top-100

| # | 题目 | 难度 | 标签 | 日期 | 掘金 |
| - | --- | ---- | ---- | ---- | ---- |
| 1 | [两数之和](top-100/001-two-sum.md) | 🟢 简单 | 数组 / 哈希表 | 2026-11-08 | - |
| 2 | [两数相加](top-100/002-add-two-numbers.md) | 🟡 中等 | 链表 | 2026-11-14 | - |
<!-- INDEX:END -->
