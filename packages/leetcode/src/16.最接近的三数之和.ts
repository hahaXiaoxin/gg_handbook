/*
 * @lc app=leetcode.cn id=16 lang=typescript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
function threeSumClosest(nums: number[], target: number): number {
    const n = nums.length;
    nums.sort((a, b) => a - b);
    
    // 优化一：边界情况检查，对最小和最大的情况做提前返回
    const minSum = nums[0] + nums[1] + nums[2];
    if (minSum >= target) return minSum;
    
    const maxSum = nums[n-3] + nums[n-2] + nums[n-1];
    if (maxSum <= target) return maxSum;
    
    let closest = minSum;
    
    for (let i = 0; i < n - 2; i++) {
        // 跳过重复元素
        if (i > 0 && nums[i] === nums[i-1]) continue;
        
        let left = i + 1;
        let right = n - 1;
        
        // 优化二：计算当前i下的最小和最大可能值，其作用和优化一一样
        const minCurrent = nums[i] + nums[left] + nums[left+1];
        if (minCurrent > target) {
            const diff = Math.abs(minCurrent - target);
            if (diff < Math.abs(closest - target)) {
                closest = minCurrent;
            }
            continue;
        }
        
        const maxCurrent = nums[i] + nums[right-1] + nums[right];
        if (maxCurrent < target) {
            const diff = Math.abs(maxCurrent - target);
            if (diff < Math.abs(closest - target)) {
                closest = maxCurrent;
            }
            continue;
        }
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            const diff = Math.abs(sum - target);
            
            if (diff < Math.abs(closest - target)) {
                closest = sum;
            }
            
            if (sum === target) {
                return target; // 找到精确匹配，直接返回
            } else if (sum < target) {
                left++;
                // 跳过重复元素
                while (left < right && nums[left] === nums[left-1]) left++;
            } else {
                right--;
                // 跳过重复元素
                while (left < right && nums[right] === nums[right+1]) right--;
            }
        }
    }
    
    return closest;
};
// @lc code=end

