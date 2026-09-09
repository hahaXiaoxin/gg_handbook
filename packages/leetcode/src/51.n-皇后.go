/*
 * @lc app=leetcode.cn id=51 lang=golang
 *
 * [51] N 皇后
 */

// @lc code=start
package main

import (
	"strings"
)

const queue = "Q"
const dot = "."

func solveNQueens(n int) [][]string {
	// queueY[i] 表示第 i 行的皇后的坐标是什么
	queueY := make([]int, n)
	for i := 0; i < n; i++ {
		queueY[i] = -1
	}

	res := [][]string{}

	// 通过深度优先便利，每次按照行的方式进行摆放皇后
	// x 表示当前是第几行了
	var dfs func(x int, grid [][]string)
	dfs = func(x int, grid [][]string) {
		// 如果已经是下标为 n 的行了，说明需要结算答案了
		if x == n {
			ans := []string{}
			for _, row := range grid {
				ans = append(ans, strings.Join(row, ""))
			}
			res = append(res, ans)
			return
		}
		// 遍历当前行的每一格
		searchCol: for y := 0; y < n; y++ {
			for i, j := range queueY {
				// 如果是 -1 说明坐标为[x,y]肯定可以放下棋子
				if j == -1 {
					break;
				}

				// 首先看当前列是否有皇后, 如果 j==y 说明这一列已经不能放了，直接搜索下一格
				if j == y {
					continue searchCol
				}

				// 开始判断斜线上是否能放, x 永远大于 i
				sub := x - i
				// 推算斜线上当行为 x 时，列是多少
				if (j + sub) == y || (j - sub) == y {
					continue searchCol
				}
			}

			// 如果能走到这里，说明当前节点一定是可选的
			grid[x][y] = queue
			queueY[x] = y
			dfs(x+1, grid)
			queueY[x] = -1
			grid[x][y] = dot
		}
	}

	// 初始化位图
	grid := make([][]string, n)
	for i := 0; i < n; i++ {
		grid[i] = make([]string, n)
		for j := 0; j < n; j++ {
			grid[i][j] = dot
		}
	}

	dfs(0, grid)

	return res;
}

// @lc code=end
