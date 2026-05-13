/*
 * @lc app=leetcode.cn id=2784 lang=typescript
 *
 * [2784] 检查数组是否是好的
 */

// @lc code=start
/**
 * @param nums 数组
 * 
 * 解决这题只需要满足两个条件：
 * 1. 除了数字为 length - 1 的数字外，其它数字只能出现一次，并且该数字必须出现两次
 * 2. 符合要求的数组一定可以组成[length - 1, 1, 2,……, length - 1]的格式
 */
function isGood(nums: number[]): boolean {
    const length = nums.length;
    const maxValue = length - 1;

    for (let i = 0; i < length; i++) {
        
        const value = Math.abs(nums[i]);

        if (value > maxValue || maxValue < 1) return false;

        if (nums[value] > 0) nums[value] = -nums[value];
        else {
            if (value !== maxValue) return false;
            if (nums[value] < 0) {
                if (nums[0] < 0) {
                    return false;
                }
                nums[0] = -nums[0];
                continue
            }
            nums[value] = -nums[value];
        }
    }

    return true;
};
// @lc code=end

