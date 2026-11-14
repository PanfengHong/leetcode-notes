---
id: 3
title: 无重复字符的最长子串
difficulty: medium         
tags: [双指针, 哈希表, 滑动窗口]
date: 2026-11-14
juejin: ""                
---

# 3. 无重复字符的最长子串

> [原题链接](https://leetcode.cn/problems/longest-substring-without-repeating-characters)

## 描述

给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。

## 思路

滑动窗口（双指针 + 哈希表）
核心：
- 窗口 [left, right] 代表当前无重复字符的区间
- 用哈希表记录字符最后一次出现的下标
- 右指针不断向右扩张；如果遇到重复字符，left 跳到重复字符上次位置的下一位（注意 left 不能回退）

## 代码

```javascript
function lengthOfLongestSubstring(s) {
    const map = new Map();
    let left = 0;
    let right = 0;
    let max = 0;
    while (right < s.length) {
        const char = s[right];
        if (map.has(char)) {
            left = Math.max(left, map.get(char) + 1);
        }
        map.set(char, right);
        max = Math.max(max, right - left + 1);
        right++;
    }
    return max;
}
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)
