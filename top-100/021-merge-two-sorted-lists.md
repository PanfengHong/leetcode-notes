---
id: 21
title: 合并两个有序链表
difficulty: easy          
category: 链表            
tags: [链表]
date: 2026-11-18
juejin: ""               
---

# 21. 合并两个有序链表

> [原题链接](https://leetcode.cn/problems/merge-two-sorted-lists/)

## 描述

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

## 思路

1.创建虚拟头节点，简化链表头处理逻辑
2.双指针同时遍历两个链表，每次取较小值接入新链表
3.其中一条链表遍历完后，直接拼接剩余未遍历节点
4.返回虚拟头节点的下一个节点（真实链表起点）

## 代码

```javascript
function mergeTwoLists(list1, list2) {
    // 创建虚拟头节点
    const dummy = new ListNode(0);
    let cur = dummy;
    
    while (list1 && list2) {
        if (list1.val < list2.val) {
            cur.next = list1;
            list1 = list1.next;
        } else {
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }
    // 处理剩余节点
    cur.next = list1 || list2;
    return dummy.next;
}
```

## 复杂度分析

- 时间复杂度：O(m + n)
- 空间复杂度：O(1)
