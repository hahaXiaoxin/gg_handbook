/*
 * @lc app=leetcode.cn id=75 lang=golang
 *
 * [75] 颜色分类
 */

// @lc code=start
package main

func sortColors(nums []int) {
	head := 0
	length := len(nums)
	tail := length - 1

	// head 和 tail 指向第一个不是 0 和最后一个不是 2 的下标
	for head < length && nums[head] == 0 {
		head++
	}

	for tail >=0 && nums[tail] == 2 {
		tail--
	}

	for i := head; i <= tail && head < tail; {
		if i < head {
			i = head
		}

		if nums[i] == 0 {
			nums[head], nums[i] = nums[i], nums[head]
			for head < length && nums[head] == 0 {
				head++
			}
			continue
		}

		if nums[i] == 2 {
			nums[tail], nums[i] = nums[i], nums[tail]
			for tail >=0 && nums[tail] == 2 {
				tail--
			}
			continue
		}

		i++
	}
}

// func main() {
// 	sortColors([]int{2,0})
// }

// @lc code=end
