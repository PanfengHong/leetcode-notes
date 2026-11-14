---
id: 42
title: 接雨水
difficulty: hard          
tags: [双指针]                  
date: 2026-11-14
juejin: ""         
---

# 42. 接雨水

> [原题链接](https://leetcode.cn/problems/trapping-rain-water)

## 描述

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

## 思路

核心原理：一根柱子能接的水量 = Math.min(左侧最高柱子,右侧最高柱子) - 当前柱子高度，结果大于 0 才可以积水。

原理：
- leftMax：左边最大值，rightMax：右边最大值
- 如果 leftMax < rightMax：当前位置的积水由左边最大值决定，处理左指针；反之处理右指针。

## 代码

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);
        if (leftMax < rightMax) {
            water += leftMax - height[left];
            left++;
        } else {
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
