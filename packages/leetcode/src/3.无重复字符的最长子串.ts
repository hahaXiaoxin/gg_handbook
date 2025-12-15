/*
 * @lc app=leetcode.cn id=3 lang=typescript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
function lengthOfLongestSubstring(s: string): number {
    let maxLength = 0;
    const map = new Map<string, number>();
    let start = 0;

    for (let end = 0; end < s.length; end++) {
        const char = s[end];
        
        // 如果字符已经在当前窗口中出现过
        if (map.has(char) && map.get(char)! >= start) {
            // 更新窗口起始位置到重复字符的下一个位置
            start = map.get(char)! + 1;
        } else {
            // 更新最大长度（当前窗口大小）
            maxLength = Math.max(maxLength, end - start + 1);
        }
        
        // 记录字符最新位置
        map.set(char, end);
    }

    return maxLength;
}
// @lc code=end
