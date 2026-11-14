---
id: 20
title: 有效的括号
difficulty: easy          
tags: [栈]                  
date: 2026-11-14
juejin: ""                
---

# 20. 有效的括号

> [原题链接](https://leetcode.cn/problems/valid-parentheses)

## 描述

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：
- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。
- 每个右括号都有一个对应的相同类型的左括号。

## 思路

典型栈问题：
1.建立括号映射：右括号 → 对应的左括号
2.遍历字符串：
- 如果是左括号，压入栈
- 如果是右括号：取出栈顶，判断是否匹配；不匹配直接返回 false
3.最后栈必须为空（所有左括号都被闭合）

## 代码

```javascript
function isValid(s) {
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    const stack = [];
    for (const char of s) {
        if (map[char]) {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}
```

## 复杂度分析

- 时间复杂度：O(n),n 为字符串长度，遍历一次
- 空间复杂度：O(n), 最坏情况所有括号都是左括号，栈会存储所有左括号
