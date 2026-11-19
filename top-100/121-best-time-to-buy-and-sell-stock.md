---
id: 121
title: 买卖股票的最佳时机
difficulty: easy          
category: 贪心            
tags: [贪心]                  
date: 2026-11-19
juejin: ""                
---

# 121. 买卖股票的最佳时机

> [原题链接](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

## 描述

给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

## 思路

遍历数组，一边记录到当前为止的最低价格，一边计算当天卖出的利润，更新最大利润

## 代码

```javascript
function maxProfit(prices) {
    let minPrice = Number.MAX_VALUE;
    let maxProfit = 0;
    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
