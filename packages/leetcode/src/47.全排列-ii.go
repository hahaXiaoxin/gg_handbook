/*
 * @lc app=leetcode.cn id=47 lang=golang
 *
 * [47] 全排列 II
 */

// @lc code=start
package main

import "sort"

func permuteUnique(nums []int) [][]int {
	sort.Ints(nums)

	res := [][]int{}
	path := []int{}
	used := make([]bool, len(nums))

	var dfs func()

	dfs = func() {
		if len(path) == len(nums) {
			res = append(res, append([]int{}, path...))
			return
		}

		for i := 0; i < len(nums); i++ {
			if used[i] {
				continue
			}

			if i > 0 && nums[i] == nums[i-1] && !used[i - 1] {
				continue
			}

			used[i] = true
			path = append(path, nums[i])
			dfs()
			path = path[:len(path)-1]
			used[i] = false
		}
	}


	dfs()
	return res
}

// @lc code=end
