/*
 * @lc app=leetcode.cn id=10 lang=typescript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start

/**
 * 初始化动态规划数组
 * @param s 待匹配的字符串
 * @param p 正则表达式模式
 * @returns [字符串长度, 模式长度, dp数组]
 */
function init(s: string, p: string) {
    const sLength = s.length;
    const pLength = p.length;
    // 创建 dp 数组，dp[i][j] 表示 s 的前 i 个字符与 p 的前 j 个字符是否匹配
    const dp = Array.from({ length: sLength + 1 }, () => Array(pLength + 1).fill(false));

    // 空字符串匹配空模式
    dp[0][0] = true;

    // 处理 s 为空字符串，p 包含 * 的情况
    for (let j = 2; j <= pLength; j++) {
        if (p[j - 1] === '*') {
            // 当 * 匹配 0 个前面的字符时，等同于跳过 "字符+*" 组合
            dp[0][j] = dp[0][j - 2];
        } else {
            // 非 * 字符无法匹配空字符串
            dp[0][j] = false;
        }
    }

    return [sLength, pLength, dp] as const;
}

/**
 * 动态规划解法
 * @param s 待匹配的字符串
 * @param p 正则表达式模式
 * @returns 是否匹配
 */
function dp(s: string, p: string): boolean {
    const [sLength, pLength, dpCache] = init(s, p);

    // 遍历填充 dp 表格
    for (let i = 1; i <= sLength; i++) {
        const sChar = s[i - 1]; // 当前字符串中的字符

        for (let j = 1; j <= pLength; j++) {
            const pChar = p[j - 1]; // 当前模式中的字符

            if (pChar === '.') {
                // 点号可以匹配任意单个字符
                dpCache[i][j] = dpCache[i - 1][j - 1];
            }
            else if (pChar === '*') {
                // * 需要和前一个字符一起考虑，并且根据题目得知：此时 j 必须 >= 2
                const prePChar = p[j - 2]; // * 前面的字符

                // 两种情况：
                // 1. * 匹配 0 次：跳过 "字符+*" 组合，使用 dp[i][j-2]
                // 2. * 匹配多次：当前字符需匹配 prePChar 或 '.'，且 s 的前 i-1 个字符已与当前模式匹配
                dpCache[i][j] = dpCache[i][j - 2] || (dpCache[i - 1][j] && (sChar === prePChar || prePChar === '.'));
            }
            else {
                // 普通字符需要精确匹配
                dpCache[i][j] = dpCache[i - 1][j - 1] && sChar === pChar;
            }
        }
    }

    // 返回整个字符串是否与整个模式匹配
    return dpCache[sLength][pLength];
};

/**
 * 主函数：判断字符串是否匹配正则表达式
 * @param s 待匹配的字符串
 * @param p 正则表达式模式
 * @returns 是否匹配
 */
function isMatch(s: string, p: string): boolean {
    return dp(s, p);  // 动态规划解法（当前使用）
}
// @lc code=end

export { isMatch };

