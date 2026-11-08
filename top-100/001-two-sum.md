---
id: 1
title: 两数之和
difficulty: easy
tags: [数组, 哈希表]
date: 2026-11-08
juejin: ""
---

# 1. 两数之和

> [原题链接](https://leetcode.cn/problems/two-sum/)

## 思路

暴力解法是双重循环枚举所有数对，时间复杂度 O(n²)。

优化关键：遍历数组时，用哈希表记录「数值 → 下标」。对每个数 `x`，先查询 `target - x` 是否已在哈希表中——在则直接返回两个下标，不在则将 `x` 存入。一次遍历即可完成。

## 代码

```ts
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>(); // 数值 -> 下标
    for (let i = 0; i < nums.length; i++) {
        const need = target - nums[i];
        if (map.has(need)) return [map.get(need)!, i];
        map.set(nums[i], i);
    }
    return [];
}
```

## 复杂度分析

- 时间复杂度：O(n)，一次遍历，哈希表查找与写入均为 O(1)
- 空间复杂度：O(n)，哈希表最多存 n 个元素
