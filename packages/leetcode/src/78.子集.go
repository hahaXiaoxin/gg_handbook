/*
 * @lc app=leetcode.cn id=78 lang=golang
 *
 * [78] 子集
 */

// @lc code=start
package main

func subsets(nums []int) [][]int {
	res := [][]int{}
	var dfs func(start int, path []int)
	dfs = func(start int, path []int) {
		// 每进入一层，当前 path 就是一个合法子集
		tmp := make([]int, len(path))
		copy(tmp, path)
		res = append(res, tmp)

		for i := start; i < len(nums); i++ {
			path = append(path, nums[i])
			dfs(i+1, path)
			path = path[:len(path)-1]
		}
	}
	dfs(0, []int{})
	return res
}

// @lc code=end

