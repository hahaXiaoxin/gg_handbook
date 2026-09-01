/*
 * @lc app=leetcode.cn id=49 lang=golang
 *
 * [49] 字母异位词分组
 */

// @lc code=start
package main

import (
	"sort"
	"strings"
)

func groupAnagrams(strs []string) [][]string {
	result := [][]string{}

	// 使用 map 存入每个异位词的结果
	groupMap := map[string][]string{}

	for _, str := range strs {
		strArr := strings.Split(str, "")
		sort.Strings(strArr)

		key := strings.Join(strArr, "")
		if arr, ok := groupMap[key]; ok {
			groupMap[key] = append(arr, str)
		} else {
			groupMap[key] = []string{str}
		}
	}

	for _, value := range groupMap {
		result = append(result, value)
	}

	return result
}

// @lc code=end
