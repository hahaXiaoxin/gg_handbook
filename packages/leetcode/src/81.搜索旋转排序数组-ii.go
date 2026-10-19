/*
 * @lc app=leetcode.cn id=81 lang=golang
 *
 * [81] 搜索旋转排序数组 II
 */

// @lc code=start
package main

// 思路：二分 + 处理重复元素导致的「无法判断哪半边有序」
//
// 相比题 33（无重复），这里多一种情况：nums[l] == nums[mid] == nums[r]。
// 此时左右两端和中间一样大，无法推断哪半边是递增的，
// 唯一能做的就是把两端各缩一格（l++; r--），继续二分。
//
// 复杂度：
//   - 最好/平均 O(log n)，空间 O(1)
//   - 最坏 O(n)，例如 [1,1,1,1,1] 里找 2，每一步都只能缩两端
//
// 这个最坏情况是「理论上不可避免」的，不是实现问题：
// 取 target = 1，输入由 n-1 个 0 和至多一个 1 组成（都是 [0,...,0,1] 的某个旋转，合法）。
// 算法要回答「不存在」，就必须读过全部 n 个位置；
// 否则对手把那个没读过的位置改成 1，算法行为不变却答错了。
// 所以「不存在」这一支的最坏下界就是 Ω(n)，本题不存在更快的正确解法。
func search(nums []int, target int) bool {
	l, r := 0, len(nums)-1

	for l <= r {
		mid := l + (r-l)/2

		if nums[mid] == target {
			return true
		}

		// 三值相等：无法判断有序区间，只能把区间两端各缩一格。
		// 同时缩两端（而不是只缩一边）可以让退化时的常数减半。
		if nums[l] == nums[mid] && nums[mid] == nums[r] {
			l++
			r--
			continue
		}

		// 走到这里，左右两半至少有一半是有序的
		if nums[l] <= nums[mid] {
			// 左半边有序
			if nums[l] <= target && target < nums[mid] {
				r = mid - 1 // target 只可能在左半边
			} else {
				l = mid + 1
			}
		} else {
			// 右半边有序
			if nums[mid] < target && target <= nums[r] {
				l = mid + 1 // target 只可能在右半边
			} else {
				r = mid - 1
			}
		}
	}

	return false
}

// @lc code=end
