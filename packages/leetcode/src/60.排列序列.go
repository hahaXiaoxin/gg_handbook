/*
 * @lc app=leetcode.cn id=60 lang=golang
 *
 * [60] 排列序列
 *
 * 思路：
 * 	如果 n = 5，那么第一位数为 x 的情况只有 4 种，并且位置是第 4(x - 1) + 1 到 4x
 *  同理，那么第二位数是 y 的情况也就只有 3 种，并且位置是 4(x-1) + 3(y - 1) + 1 到 4(x-1) + 3y
 *  以此内推，那么可以不断的进行锁定
 *  例如题目求 n=3
 *  2(x - 1) + 1 <= 3 <= 2x，其中 x >= 1，可以得到 x 为 2
 *  然后再求第二位，判断在全局中第 3 位在第一位为 2 的队伍中排第几个，即求 3 - 2(2 - 1) = 1 第一位
 *  再用上述的方法，求得第一位是 1（这里应该是 1……n 中的第一个没被使用的数）
 *  这样就可以不断的拆解问题，最终得到答案
 */

// @lc code=start

package main

import (
	"slices"
	"strconv"
)

func factorial(n int) int {
	result := 1
	for i := 2; i <= n; i++ {
		result *= i
	}
	return result
}

func getPermutation(n int, k int) string {
	res := ""
	// 定义一个数组，用于记录当前的数字是否被使用了
	arr := make([]bool, n)
	relativeK := k

	for index := n - 1; index > 0; index-- {
		// step 是阶乘
		step := factorial(index)
		// 求当前这位数是数组中的第几个,利用公式可以求出（这里利用 int 的特性，直接忽略小数了）
		x := (relativeK-1)/step + 1
		// 此时需要更新 relativeK
		relativeK = relativeK - step*(x-1)
		// 那么当前这一位的数字就应该为 i，其中 arr[i - 1]是第 x 个不为 true 的数字
		for i := 0; i < n; i++ {
			if arr[i] == true {
				continue
			}

			if x == 1 {
				res = res + strconv.Itoa(i+1)
				// 同时更新 arr,表示i + 1 这个数已经被使用了
				arr[i] = true
			}
			x--
		}
	}

	// 此时 step 为 0，表示已经到最后一位了，只有一个值可以选了
	x := slices.Index(arr, false)

	res = res + strconv.Itoa(x+1)

	return res
}

// func main() {
// 	res := getPermutation(4, 9)
// 	fmt.Println(res)
// 	return;
// }

// @lc code=end
