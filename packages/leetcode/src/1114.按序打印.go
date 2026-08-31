/*
 * @lc app=leetcode.cn id=1114 lang=golang
 *
 * [1114] 按序打印
 */

// @lc code=start
package main

type Foo struct {
	firstCh chan struct{}
	secondCh chan struct{}
}

func NewFoo() *Foo {
	return &Foo{
		firstCh: make(chan struct{}),
		secondCh: make(chan struct{}),
	}
}

func (f *Foo) First(printFirst func()) {
	// Do not change this line
	printFirst()
	f.firstCh <- struct{}{}
}

func (f *Foo) Second(printSecond func()) {
	<-f.firstCh
	close(f.firstCh)
	/// Do not change this line
	printSecond()
	f.secondCh <- struct{}{}
}

func (f *Foo) Third(printThird func()) {
	<-f.secondCh
	close(f.secondCh)
	// Do not change this line
	printThird()
}
// @lc code=end

