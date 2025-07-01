/*
 * @lc app=leetcode.cn id=18 lang=typescript
 *
 * [18] 四数之和
 */

// @lc code=start
function fourSum(nums: number[], target: number): number[][] {
    const sortedNums = nums.sort((a, b) => a - b);
    const result: Array<[number, number, number, number]> = [];
    const n = sortedNums.length;

    if (nums.length === 4 && nums.reduce((a, b) => a + b, 0) === target) {
        return [nums];
    }

    const maxNums = sortedNums[n - 1];

    for (let i = 0; i < n - 3; i++) {
        const threeTargetSum = target - sortedNums[i];

        if (i > 0 && sortedNums[i] === sortedNums[i - 1]) {
            continue;
        }

        // 优化
        if (threeTargetSum < 0 && sortedNums[i] > 0) {
            return result;
        }

        // 优化
        if (threeTargetSum > 0 && maxNums < 0) {
            return result;
        }

        for (let j = i + 1; j < n - 2; j++) {
            const twoTargetSum = threeTargetSum - sortedNums[j];

            if (j > i + 1 && sortedNums[j] === sortedNums[j - 1]) {
                continue;
            }

            // 优化
            if (twoTargetSum < 0 && sortedNums[j] > 0) {
                continue;
            }

            // 优化
            if (twoTargetSum > 0 && maxNums < 0) {
                continue;
            }

            const twoSumResult = twoSum(sortedNums.slice(j + 1), twoTargetSum);

            for (const [a, b] of twoSumResult) {
                result.push([sortedNums[i], sortedNums[j], a, b]);
            }
        }
    }

    return result;
}

function twoSum(nums: number[], target: number): number[][] {
    const result: Array<[number, number]> = [];

    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const sum = nums[left] + nums[right];

        if (sum === target) {
            result.push([nums[left], nums[right]]);

            do {
                left++;
            } while (nums[left] === nums[left - 1]);

            do {
                right--;
            } while (nums[right] === nums[right + 1]);
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return result;
}
// @lc code=end
