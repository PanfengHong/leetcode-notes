---
id: 70
title: 爬楼梯
difficulty: easy
category: 动态规划
tags: [数学, 动态规划]
date: 2026-11-18
juejin: ""                
---

# 70. 爬楼梯

> [原题链接](https://leetcode.cn/problems/climbing-stairs/)

## 描述

你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

## 思路

每次只能爬 1 阶或 2 阶，到达第 n 阶的方法数 = 到达 n-1 阶的方法数（再爬 1 阶） + 到达 n-2 阶的方法数（再爬 2 阶）递推公式：f(n) = f(n-1) + f(n-2)
边界条件：
- n = 1：1 种
- n = 2：2 种

## 代码

```javascript
function climbStairs(n) {
    // 初始化边界条件
    const dp = [1, 2];
    // 递推
    for (let i = 2; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n - 1];
}
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
