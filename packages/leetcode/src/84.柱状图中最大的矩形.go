/*
 * @lc app=leetcode.cn id=84 lang=golang
 *
 * [84] 柱状图中最大的矩形
 */

// @lc code=start
package main

// 思路：单调栈（栈内下标对应的高度单调递增）
//
// 对每根柱子 i，向左右找到第一个「严格矮于」它的柱子，
// 这两个边界之间的宽度就是以 heights[i] 为高的最大矩形宽度。
// 遍历时用栈维护一个高度递增的下标序列：当遇到一个比栈顶更矮的柱子时，
// 说明栈顶柱子的右边界已经确定（就是当前位置），弹出并结算。
// 弹出的同时，新的栈顶就是它左边第一个更矮的柱子，左边界也就确定了。
//
// 复杂度：每个下标最多入栈/出栈一次，时间 O(n)，空间 O(n)。
// （原先的二维 dp 是 O(n^2) 空间，n=1e5 时会直接内存溢出。）
func largestRectangleArea(heights []int) int {
	n := len(heights)
	// 栈底放一个哨兵 -1，既作为最左侧的「虚拟矮柱」，也避免了栈空的判断
	stack := make([]int, 0, n+1)
	stack = append(stack, -1)

	res := 0

	// 多遍历一次 i == n，相当于在最右侧放一个高度为 0 的哨兵，
	// 强制把栈里剩下的柱子全部弹出结算
	for i := 0; i <= n; i++ {
		cur := 0
		if i < n {
			cur = heights[i]
		}

		// 遇到更矮的柱子，栈顶的右边界确定，开始弹栈结算
		for len(stack) > 1 && heights[stack[len(stack)-1]] > cur {
			top := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			// 弹出后新的栈顶就是左边界的前一位
			width := i - stack[len(stack)-1] - 1
			if area := heights[top] * width; area > res {
				res = area
			}
		}

		stack = append(stack, i)
	}

	return res
}

// @lc code=end
