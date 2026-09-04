/*
 * @lc app=leetcode.cn id=407 lang=golang
 *
 * [407] 接雨水 II
 */

// @lc code=start
package main

import "container/heap"

// 这里不能用按照一维的方式去计算，不然遇到这种情况就会导致水流光
//
// heightMap = [
//
//	[3, 3, 3, 3, 3],
//	[3, 1, 1, 1, 1],   // 右边这格高度是 1，水从这里流走
//	[3, 1, 1, 1, 3],
//	[3, 1, 1, 1, 3],
//	[3, 3, 3, 3, 3],
//
// ]
func trapRainWaterError(heightMap [][]int) int {
	m := len(heightMap)
	n := len(heightMap[0])

	// 构建两个矩阵，分别记录每个点的左\上和右\下两种情况的最高值
	leftAndTopMax, rightAndBottomMax := make([][]int, m), make([][]int, m)
	for i := 0; i < m; i++ {
		leftAndTopMax[i] = make([]int, n)
		rightAndBottomMax[i] = make([]int, n)
	}

	// 开始遍历每个节点，给对应的节点赋值
	for i := range m {
		for j := range n {
			// 边界元素直接设置为 0
			if i == 0 || j == 0 {
				leftAndTopMax[i][j] = 0
				rightAndBottomMax[m-1-i][n-1-j] = 0

				continue
			}

			// 如果是内部的元素，则每个元素的左上方最高值为：
			// 左边元素的左上方最大值和左边元素的高度取大值，
			// 上边元素的左上方最大值和上边元素的高度取大值
			// 上面两个结果的最小值
			leftMax := max(leftAndTopMax[i-1][j], heightMap[i-1][j])
			topMax := max(leftAndTopMax[i][j-1], heightMap[i][j-1])
			leftAndTopMax[i][j] = min(leftMax, topMax)

			// 两个 max 矩阵按照对称的方式进行补充，接下来参照节点切换到对称的位置去
			rightMax := max(rightAndBottomMax[m-i][j], heightMap[m-i][j])
			bottomMax := max(rightAndBottomMax[i][n-j], heightMap[i][n-j])
			rightAndBottomMax[i][j] = min(rightMax, bottomMax)
		}
	}

	// 后续同样的，每个节点我们计算两个最大值的最小值，就只这个节点能接的水
	result := 0
	for i := range m {
		for j := range n {
			sub := min(leftAndTopMax[i][j], rightAndBottomMax[i][j]) - heightMap[i][j]
			if sub <= 0 {
				continue
			}

			result = result + sub
		}
	}

	return result
}

type cell struct {
	height int
	row    int
	col    int
}

// 定义最小堆
type minHeap []cell

// 这里是定义一个最小堆，最小堆方法都用 heap 来调用，我们只需要实现怎么修改数组的就可以了，heap 内部会调用上面的方法
func (h minHeap) Len() int           { return len(h) }

// 表示小的要在前面，表示最小堆
func (h minHeap) Less(i, j int) bool { return h[i].height < h[j].height }
func (h minHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(v any)        { *h = append(*h, v.(cell)) }
func (h *minHeap) Pop() any {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func trapRainWater(heightMap [][]int) int {
	m, n := len(heightMap), len(heightMap[0])
	h := &minHeap{}
	visited := make([][]bool, m)
	for i := 0; i < m; i++ {
		visited[i] = make([]bool, n)
	}

	// 最外圈全部入堆，并标记已访问
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if i == 0 || i == m-1 || j == 0 || j == n-1 {
				heap.Push(h, cell{heightMap[i][j], i, j})
				visited[i][j] = true
			}
		}
	}

	dirs := [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	ans := 0

	for h.Len() > 0 {
		cur := heap.Pop(h).(cell)
		for _, d := range dirs {
			r, c := cur.row+d[0], cur.col+d[1]
			if r < 0 || r >= m || c < 0 || c >= n || visited[r][c] {
				continue
			}
			visited[r][c] = true
			// 邻居比当前水位低，就能存水
			ans += max(0, cur.height-heightMap[r][c])
			// 邻居入堆，高度取两者较大值（水位不下降）
			heap.Push(h, cell{max(cur.height, heightMap[r][c]), r, c})
		}
	}

	return ans
}

// @lc code=end
