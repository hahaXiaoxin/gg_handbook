/*
 * @lc app=leetcode.cn id=15 lang=typescript
 *
 * [15] 三数之和
 */

// @lc code=start
function threeSum(nums: number[]): number[][] {
    const result: number[][] = [];

    const sortedNums = nums.sort((a, b) => a - b);

    for (let i = 0; i < sortedNums.length; i++) {
        const curNum = sortedNums[i];

        if (i > 0 && sortedNums[i] === sortedNums[i - 1]) {
            continue;
        }

        const twoSumResult = twoSum(sortedNums.slice(i + 1), -curNum);

        for (const [a, b] of twoSumResult) {
            result.push([curNum, a, b]);
        }
    }

    return result;
}

// @ts-ignore
function twoSum(nums: number[], target: number): number[][] {
    const result: number[][] = [];

    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const a = nums[left];
        const b = nums[right];
        const sum = a + b;
        if (sum === target) {
            result.push([a, b]);
            do {
                left++;
            } while (left < right && nums[left] === a);

            do {
                right--;
            } while (left < right && nums[right] === b);
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return result;
}
// @lc code=end
