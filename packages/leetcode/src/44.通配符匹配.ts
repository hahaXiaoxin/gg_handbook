/*
 * @lc app=leetcode.cn id=44 lang=typescript
 *
 * [44] 通配符匹配
 */

// @lc code=start

/**
 * 初始化动态规划数组
 * @param s 待匹配的字符串
 * @param p 通配符模式
 * @returns [字符串长度, 模式长度, dp数组]
 */
function init(s: string, p: string) {
    const sLength = s.length;
    const pLength = p.length;

    const dp = Array.from({ length: sLength + 1 }, () => new Array(pLength + 1).fill(false)) as Array<Array<boolean>>;

    dp[0][0] = true;

    return [sLength, pLength, dp] as const;
}

function isMatch(s: string, p: string): boolean {
    const [sLength, pLength, dp] = init(s, p);

    for (let pIndex = 0; pIndex < pLength; pIndex++) {
        for(let sIndex = 0; sIndex < sLength; sIndex++) {
            
        }
    }

    return dp[sLength][pLength];
};
// @lc code=end

