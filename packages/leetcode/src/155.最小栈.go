/*
 * @lc app=leetcode.cn id=155 lang=golang
 *
 * [155] 最小栈
 */

// @lc code=start
package main

import "math"

type MinStack struct {
	arr    []int
	minArr []int
}

func Constructor() MinStack {
	return MinStack{
		arr:    []int{},
		minArr: []int{},
	}
}

func (this *MinStack) Push(value int) {
	this.arr = append(this.arr, value)

	if len(this.minArr) == 0 {
		this.minArr = append(this.minArr, value)
	} else {
		curMinValue := this.minArr[len(this.minArr)-1]
		this.minArr = append(this.minArr, int(math.Min((float64(value)), float64(curMinValue))))
	}
}

func (this *MinStack) Pop() {
	this.arr = this.arr[:len(this.arr)-1]
	this.minArr = this.minArr[:len(this.minArr)-1]
}

func (this *MinStack) Top() int {
	return this.arr[len(this.arr)-1]
}

func (this *MinStack) GetMin() int {
	return this.minArr[len(this.minArr)-1]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(value);
 * obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.GetMin();
 */
// @lc code=end
