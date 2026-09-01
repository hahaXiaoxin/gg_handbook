/*
 * @lc app=leetcode.cn id=1115 lang=golang
 *
 * [1115] 交替打印 FooBar
 */

// @lc code=start
package main

import "sync"

type FooBar struct {
	n     int
	isFoo bool
	mu    *sync.Mutex
	cond  *sync.Cond
}

func NewFooBar(n int) *FooBar {
	mu := &sync.Mutex{}
	return &FooBar{
		n:     n,
		mu:    mu,
		isFoo: true,
		cond:  sync.NewCond(mu),
	}
}

func (fb *FooBar) Foo(printFoo func()) {
	for i := 0; i < fb.n; i++ {
		fb.mu.Lock()
		if !fb.isFoo {
			fb.cond.Wait()
		}
		// printFoo() outputs "foo". Do not change or remove this line.
		printFoo()
		fb.isFoo = false
		fb.mu.Unlock()
		fb.cond.Broadcast()
	}
}

func (fb *FooBar) Bar(printBar func()) {
	for i := 0; i < fb.n; i++ {
		fb.mu.Lock()
		// 只要不是 Bar 的回合就等待，直到拿到锁
		if fb.isFoo {
			fb.cond.Wait()
		}
		// printBar() outputs "bar". Do not change or remove this line.
		printBar()
		fb.isFoo = true
		fb.mu.Unlock()
		fb.cond.Broadcast()
	}
}

// @lc code=end
