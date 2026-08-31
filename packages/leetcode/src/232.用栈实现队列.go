/*
 * @lc app=leetcode.cn id=232 lang=golang
 *
 * [232] 用栈实现队列
 */

// @lc code=start
package main

type MyQueue struct {
	in  []int
	out []int
}

// func Constructor() MyQueue {
func constructor() MyQueue {
	return MyQueue{
		in:  []int{},
		out: []int{},
	}
}

func (this *MyQueue) Push(x int) {
	this.in = append(this.in, x)
}

func (this *MyQueue) inToOut() {
	for len(this.in) > 0 {
		top := this.in[len(this.in)-1]
		this.in = this.in[:len(this.in)-1]
		this.out = append(this.out, top)
	}
}

func (this *MyQueue) Pop() int {
	if len(this.out) == 0 {
		this.inToOut()
	}

	top := this.out[len(this.out)-1]
	this.out = this.out[:len(this.out)-1]
	return top
}

func (this *MyQueue) Peek() int {
	if len(this.out) == 0 {
		this.inToOut()
	}

	top := this.out[len(this.out)-1]
	return top
}

func (this *MyQueue) Empty() bool {
	return len(this.in) == 0 && len(this.out) == 0
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(x);
 * param_2 := obj.Pop();
 * param_3 := obj.Peek();
 * param_4 := obj.Empty();
 */
// @lc code=end
