/*
 * @lc app=leetcode.cn id=43 lang=typescript
 *
 * [43] 字符串相乘
 */

// @lc code=start
function multiply(num1: string, num2: string): string {
    const len1 = num1.length;
    const len2 = num2.length;

    const result = Array(len1 + len2).fill(0);

    for (let i = len1 - 1; i >= 0; i--) {
        for (let j = len2 - 1; j >= 0; j--) {
            const mul = Number(num1[i]) * Number(num2[j]);
            const p1 = i + j;
            const p2 = i + j + 1;
            const sum = mul + result[p2];
            result[p1] += Math.floor(sum / 10);
            result[p2] = sum % 10;
        }
    }

    let i = 0;
    while (i < result.length - 1 && result[i] === 0) {
        i++;
    }
    return result.slice(i).join('');
};
// @lc code=end

