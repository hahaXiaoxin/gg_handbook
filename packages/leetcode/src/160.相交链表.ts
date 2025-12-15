/*
 * @lc app=leetcode.cn id=160 lang=typescript
 *
 * [160] 相交链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    let p1 = headA, p2 = headB;
    let flag1 = false, flag2 = false;

    while(p1 !== p2) {
        if (p1.next) {
            p1 = p1.next;
        } else if (flag1) {
            return null;
        } else {
            p1 = headB;
            flag1 = true;
        }

        if (p2.next) {
            p2 = p2.next;
        } else if (flag2) {
            return null;
        } else {
            p2 = headA;
            flag2 = true;
        }
        
    }

    return p1;
}
// @lc code=end
