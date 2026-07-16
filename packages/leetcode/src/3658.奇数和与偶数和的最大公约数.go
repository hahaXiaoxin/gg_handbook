/*
 * @lc app=leetcode.cn id=3658 lang=golang
 *
 * [3658] 奇数和与偶数和的最大公约数
 */

package main


func getOddOrEvenSum(num int, isEven bool) int {
	if (num == 0) {
		return 0;
	}

	var start int;
	var end int;

	if (isEven) {
		start = 2;
		end = num * 2;
	} else {
		start = 1;
		end = num * 2 - 1;
	}

	return (start + end) * num / 2;
}

func gcd(a int, b int) int {
	if (b == 0) {
		return a;
	}

	return gcd(b, a % b);
}

func gcdOfOddEvenSums(n int) int {
	return gcd(getOddOrEvenSum(n, true), getOddOrEvenSum(n, false));
}

// @lc code=end

