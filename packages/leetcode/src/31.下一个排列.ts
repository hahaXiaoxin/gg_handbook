/*
 * @lc app=leetcode.cn id=31 lang=typescript
 *
 * [31] 下一个排列
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
function quickSort(nums: number[], left: number, right: number) {
    if (left >= right) return;
    const pivot = nums[left];

    let i = left, j = right;

    while (i < j) {
        // 从右向左找小于枢轴的元素
        while (i < j && nums[j] >= pivot) j--;
        // 从左向右找大于枢轴的元素，但要从left+1开始，跳过枢轴自身
        while (i < j && nums[i] <= pivot) i++;

        if (i < j) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }

    // 交换枢轴到正确位置
    [nums[left], nums[j]] = [nums[j], nums[left]];

    // 在枢轴的两侧递归
    quickSort(nums, left, j - 1);
    quickSort(nums, j + 1, right);
}
 
function nextPermutation(nums: number[]): void {
    let right = nums.length - 1;

    // 从右往左找到第一个非升序的元素
    while (right > 0 && nums[right - 1] >= nums[right]) {
        right--;
    }

    if (right === 0) {
        quickSort(nums, 0, nums.length - 1);
        return;
    }

    // 从右往左找到第一个比 right 大的元素
    const newNum = nums[right - 1];

    let i = nums.length - 1;

    for (; i > right - 1; i--) {
        if (nums[i] > newNum) {
            break;
        }
    }

    // 交换位置
    [nums[right - 1], nums[i]] = [nums[i], nums[right - 1]];

    // 把新元素原本的下标之后的数组排序为升序
    quickSort(nums, right, nums.length - 1);
};
// @lc code=end

