/*
 * @lc app=leetcode.cn id=997 lang=typescript
 *
 * [997] 找到小镇的法官
 */

// @lc code=start
function findJudge(n: number, trust: number[][]): number {
    const belived = new Array(n + 1).fill(0);
    const trusted = new Array(n + 1).fill(0);

    for (let [a, b] of trust) {
        belived[b]++;
        trusted[a]++;
    }

    for (let i = 1; i <= n; i++) {
        if (belived[i] === n - 1 && trusted[i] === 0) {
            return i;
        }
    }

    return -1;
};
// @lc code=end

