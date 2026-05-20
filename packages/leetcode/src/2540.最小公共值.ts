/*
 * @lc app=leetcode.cn id=2540 lang=typescript
 *
 * [2540] 最小公共值
 */

// @lc code=start
function getCommon(nums1: number[], nums2: number[]): number {
    let temp1 = 0;
    let temp2 = 0;

    while (temp1 < nums1.length && temp2 < nums2.length) {
        if (nums1[temp1] === nums2[temp2]) {
            return nums1[temp1];
        }

        if (nums1[temp1] < nums2[temp2]) {
            temp1++;
        } else {
            temp2++;
        }
    }

    return -1;
};
// @lc code=end

