---
id: 206
title: 反转链表
difficulty: easy         
tags: [链表, 双指针]                 
date: 2026-11-15
juejin: ""                
---

# 206. 反转链表

> [原题链接](https://leetcode.cn/problems/reverse-linked-list/)

## 描述

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表

## 思路

用 prev 保存前一个节点，curr 遍历当前节点，每次把 curr.next 指向 prev，再同步后移指针。

## 代码

```javascript
function reverseList(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
