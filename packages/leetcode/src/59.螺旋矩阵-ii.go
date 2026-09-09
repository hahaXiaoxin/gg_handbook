/*
 * @lc app=leetcode.cn id=59 lang=golang
 *
 * [59] 螺旋矩阵 II
 */

// @lc code=start
package main

func generateMatrix(n int) [][]int {
	matrix := make([][]int, n)
	for i := 0; i < n; i++ {
		matrix[i] = make([]int, n)
	}

	// 按照顺时针方向来
	direct := [][]int{
		{0, 1}, {1, 0}, {0, -1}, {-1, 0},
	}

	// 起点要先少一格
	i, j := 0, -1
	count := 1
	for true {
		flag := false
		// 遍历方向
		for _, d := range direct {
			until: for true {
				nextX, nextY := i+d[0], j+d[1]
				if nextX >= 0 && nextX < n && nextY >= 0 && nextY < n && matrix[nextX][nextY] == 0 {
					flag = true
					i, j = nextX, nextY
					matrix[i][j] = count
					count++
					continue
				}
				// 如果碰壁了，那么就切换方向
				break until
			}
		}

		// 如果四个方向都没有走过，说明结束了
		if !flag {
			break;
		}
	}

	return matrix
}

// @lc code=end
