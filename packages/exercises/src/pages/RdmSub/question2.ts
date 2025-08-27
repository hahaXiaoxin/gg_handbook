/**
 * 给定一个数组，一个整数s，要求获取最短的连续子数组，并且子数组的和大于s，不存在则返回0
 * @param nums 
 * @param s 
 * @returns 
 */
function getMinLengthArr(nums: number[], s: number): number {
    let res = 0;

    if (!nums.length) {
        return 0;
    }

    // 记录双指针滑动窗口，左开右闭
    let start = 0, end = 0, sum = 0;

    // 记录结果的值
    let resStart = 0, resEnd = 0;

    while(end < nums.length) {
        // 首先移动前置指针，保证窗口内的和大于s
        while(sum < s && end < nums.length) {
            sum += nums[end++];
        }

        // 移动后置指针，保证后置指针不能超过前置指针
        while(sum - nums[start] >= s) {
            sum -= nums[start++];
        }

        // 如果和满足要求则记录
        if (sum >= s && (res === 0 || end - start < res)) {
            resStart = start;
            resEnd = end;
            res = end - start;
        }

        // 继续移动后置指针，防止出现滑动窗口 === s的情况
        sum -= nums[start++];
    }

    console.log(nums.slice(resStart, resEnd));

    return res;
}

console.log(getMinLengthArr([1,2,3,4,5,6], 5))
console.log(getMinLengthArr([1,2,3,4,5,6], 50))
console.log(getMinLengthArr([1,2,3,4,5,6], 8))
console.log(getMinLengthArr([1,2,3,4,5,6], 21))