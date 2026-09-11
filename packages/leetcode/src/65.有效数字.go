/*
 * @lc app=leetcode.cn id=65 lang=golang
 *
 * [65] 有效数字
 */

// @lc code=start
package main

import (
	"regexp"
)

// 定义一个状态机
type StatusFlow struct {
	// 记录当前是否有符号了
	hasSymbol bool
	// 记录当前是否是数字
	isNumber bool
	// 记录当前是否作为 E 的参数存在
	isBeArg4E bool
	// 记录当前是否有小数点
	hasDot bool
}

// 接收一个数字
func (this *StatusFlow) inputNumber() bool {
	this.isNumber = true
	return true
}

// 接收一个符号
func (this *StatusFlow) inputSymbol() bool {
	// 如果当前已经有符号了，返回 false
	if this.hasSymbol {
		return false
	}

	// 如果当前已经有整数了，返回 false
	if this.isNumber {
		return false
	}

	if this.hasDot {
		return false
	}

	// 推进状态
	this.hasSymbol = true

	// 推进
	return true
}

// 接收一个小数点
func (this *StatusFlow) inputDot() bool {
	if this.isBeArg4E {
		return false
	}

	if this.hasDot {
		return false
	}

	this.hasDot = true

	return true
}

// 接收一个 e 或者 E
func (this *StatusFlow) inputE() bool {
	if !this.isNumber {
		return false
	}
	if this.isBeArg4E {
		return false
	}

	this.hasSymbol = false
	this.isNumber = false
	this.isBeArg4E = true
	this.hasDot = false
	return true
}

func isNumber(s string) bool {
	matchNumber, _ := regexp.Compile(`\d`)
	flow := &StatusFlow{
		hasSymbol: false,
		isNumber:  false,
		hasDot:    false,
		isBeArg4E: false,
	}

	for _, c := range s {
		if matchNumber.MatchString(string(c)) {
			if !flow.inputNumber() {
				return false
			}
			continue
		}

		if c == '+' || c == '-' {
			if !flow.inputSymbol() {
				return false
			}
			continue
		}

		if c == 'e' || c == 'E' {
			if !flow.inputE() {
				return false
			}
			continue
		}

		if c == '.' {
			if !flow.inputDot() {
				return false
			}
			continue
		}

		return false
	}

	if !flow.isNumber {
		return false
	}

	return true
}

// @lc code=end
