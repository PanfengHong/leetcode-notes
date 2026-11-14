---
id: 2
title: 两数相加
difficulty: medium          
tags: [链表]                  
date: 2026-11-14
juejin: ""         
---

# 2. 两数相加

> [原题链接](https://leetcode.cn/problems/add-two-numbers)

## 描述

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
请你将两个数相加，并以相同形式返回一个表示和的链表。
你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

## 思路

1.两个链表逆序存储数字，例如：2->4->3 代表 342，5->6->4 代表 465，相加 342+465=807，返回 7->0->8
2.核心要点：逐位相加 + 进位处理，链表长度可能不一致，最后进位要单独新增节点

## 代码

```javascript
// 定义链表节点构造函数
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    const dummy = new ListNode(0);
    let cur = dummy;
    let carry = 0;

    while (l1 || l2 || carry) {
        let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
        carry = Math.floor(sum / 10);
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }
    return dummy.next;
}
```

## 复杂度分析

- 时间复杂度：O(max(n, m))
- 空间复杂度：如果不计返回链表占用，空间复杂度 O(1)；如果计入输出，空间复杂度 O(\max(m,n))
