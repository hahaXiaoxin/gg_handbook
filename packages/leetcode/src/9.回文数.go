/*
 * @lc app=leetcode.cn id=9 lang=golang
 *
 * [9] 回文数
 */
package main

import "strconv"

// @lc code=start
func isPalindrome(x int) bool {
	// 得到字符串
	str := strconv.Itoa(x);

	len := len(str);

	for i := 0; i < len / 2; i++ {
		a, b := str[i], str[len - 1 - i];

		if (a != b) {
			return false;
		}
	}

	return true;
}

// @lc code=end
