/*
 * @lc app=leetcode.cn id=41 lang=typescript
 *
 * [41] 缺失的第一个正数
 */

// @lc code=start
function firstMissingPositive(nums: number[]): number {
    const n = nums.length;
    
    // 第一步：将数放到正确的位置上
    for (let i = 0; i < n; i++) {
        // 当前数字在有效范围内且不在正确位置上时，进行交换
        // nums[i]应该放在索引为nums[i]-1的位置上
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            // 交换nums[i]和nums[nums[i]-1]
            [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
        }
    }
    
    // 第二步：找到第一个不满足nums[i] = i+1的位置
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    
    // 如果数组中有1到n的所有数，那么缺失的第一个正数是n+1
    return n + 1;
}
// @lc code=end

