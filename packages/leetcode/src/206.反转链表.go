/*
 * @lc app=leetcode.cn id=206 lang=golang
 *
 * [206] 反转链表
 */
package main

// @lc code=start
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

// 提交时需要注释掉，不然会报错
type ListNode struct {
    Val int
    Next *ListNode
}

func reverseList(head *ListNode) *ListNode {
	var prev, curr *ListNode
	prev = nil; curr = head;

	for curr != nil {
		prev, curr.Next, curr = curr, prev, curr.Next
	}

	return prev
}
// @lc code=end
