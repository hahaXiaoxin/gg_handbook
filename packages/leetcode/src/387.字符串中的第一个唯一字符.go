/*
 * @lc app=leetcode.cn id=387 lang=golang
 *
 * [387] 字符串中的第一个唯一字符
 */
package main

// @lc code=start
func firstUniqChar(s string) int {
    strMap := make(map[rune]int);

	for _, c := range s {
		strMap[c]++;
	}

	for i, c := range s {
		if strMap[c] == 1 {
			return int(i)
		}
	}

	return -1
}
// @lc code=end

