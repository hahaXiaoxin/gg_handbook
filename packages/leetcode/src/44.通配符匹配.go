/*
 * @lc app=leetcode.cn id=44 lang=golang
 *
 * [44] 通配符匹配
 */

// @lc code=start
package main

func isMatch(s string, p string) bool {
	m, n := len(s), len(p)
	dp := make([][]bool, m+1)
	for i := 0; i <= m; i++ {
		dp[i] = make([]bool, n+1)
	}
	dp[0][0] = true

	// 先处理掉第 dp[0][x] 的内容

	// 开始进行遍历
	for i := 0; i <= m; i++ {
		var curS rune
		if i != 0 {
			curS = rune(s[i-1])
		}

		for j := 1; j <= n; j++ {
			curP := rune(p[j-1])

			// 如果是*，则只需要看前面是否匹配正确即可
			if curP == '*' {
				if i == 0 {
					dp[i][j] = dp[0][j - 1]
					continue
				}

				if dp[i-1][j-1] == true || dp[i][j-1] == true || dp[i-1][j] {
					dp[i][j] = true
				} else {
					dp[i][j] = false
				}
				continue
			}

			if i == 0 {
				dp[i][j] = false
				continue
			}

			// ?一定要匹配一个字符，所以需要判断前面 i-1 个长度的 s 和前面 j-1 个长度的 p 是否匹配
			if curP == '?' {
				if dp[i-1][j-1] == true {
					dp[i][j] = true
				} else {
					dp[i][j] = false
				}

				continue
			}

			if curS == curP {
				dp[i][j] = dp[i-1][j-1]
			} else {
				dp[i][j] = false
			}
		}
	}

	return dp[m][n]
}

// @lc code=end
