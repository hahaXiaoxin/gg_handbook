/*
 * @lc app=leetcode.cn id=14 lang=golang
 *
 * [14] 最长公共前缀
 */
package main

import "strings"

// @lc code=start
// 通过单个字符对比
func answer1(strs []string) string {
	for i, s := range strs[0] {
		for _, t := range strs {
			if len(t) <= i || rune(t[i]) != s {
				return t[:i];
			}
		}
	}

	return strs[0];
}

// 通过 strings 库对比
func answer2(strs []string) string {
	len := len(strs[0]);

	for right := 0; right <= len; right++ {
		prefix := strs[0][:right];

		for _, t := range strs {
			if !strings.HasPrefix(t, prefix) {
				return prefix[:right - 1]
			}
		}
	}

	return strs[0];
}

func longestCommonPrefix(strs []string) string {
    return answer2(strs);
}
// @lc code=end

