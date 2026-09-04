/*
 * @lc app=leetcode.cn id=42 lang=golang
 *
 * [42] 接雨水
 */

// @lc code=start
package main

func trap(height []int) int {
    len := len(height)
	leftMax, rightMax := make([]int, len), make([]int, len)

	// 第一个柱子的最左侧高度是 0，最后一个柱子的最右侧高度是 0
	leftMax[0] = 0
	rightMax[len - 1] = 0

	// 开始遍历，给 leftMax 和 rightMax 计算对应节点左右两侧的最大值
	for i := 1; i < len; i++ {
		leftMax[i] = max(leftMax[i - 1], height[i - 1])
		rightMax[len - 1 - i] = max(rightMax[len - i], height[len - i])
	}

	// 计算完毕之后再重新遍历每个柱子，进行加
	sum := 0
	for i := 0; i < len; i++ {
		if (height[i] >= leftMax[i] || height[i] >= rightMax[i]) {
			continue
		}

		sum = sum + min(leftMax[i], rightMax[i]) - height[i]
	}

	return sum;
}
// @lc code=end

