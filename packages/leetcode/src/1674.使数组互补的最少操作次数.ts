/*
 * @lc app=leetcode.cn id=1674 lang=typescript
 *
 * [1674] 使数组互补的最少操作次数
 */

// @lc code=start
function minMoves(nums: number[], limit: number): number {
    const diff = new Array(limit * 2 + 2).fill(0);
    const maxLength = nums.length
    const pair = maxLength / 2;

    for (let i = 0; i < pair; i++) {
        const left = nums[i];
        const right = nums[maxLength - 1 - i];

        const min = Math.min(left, right) + 1;
        const max = Math.max(left, right) + limit;
        const sum = left + right;

        diff[min] += 1;
        diff[max + 1] -= 1;
        diff[sum] += 1;
        diff[sum + 1] -= 1;
    }

    let max = 0;
    let cur = 0;

    for (let i = 0; i < diff.length; i++) {
        cur += diff[i];
        max = Math.max(max, cur);
    }

    return maxLength - max;
};
// @lc code=end

