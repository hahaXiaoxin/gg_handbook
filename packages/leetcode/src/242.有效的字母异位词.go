/*
 * @lc app=leetcode.cn id=242 lang=golang
 *
 * [242] 有效的字母异位词
 */
package main
// @lc code=start
func isAnagram(s string, t string) bool {
	// 定义两个 map,记录各个字母的存放数量
    m1 := make(map[rune]int);

	for _, c := range s {
		m1[c]++
	}

	for _, c := range t {
		if v, ok := m1[c]; v > 0 && ok {
			m1[c]--;
			if (v == 1) {
				delete(m1, c);
			}
		} else { 
			return false;
		}
	}

	if len(m1) > 0 {
		return false;
	}

	return true;
}
// @lc code=end

