/*
 * @lc app=leetcode.cn id=1665 lang=typescript
 *
 * [1665] 完成所有任务的最少初始能量
 */

// @lc code=start
function minimumEffort(tasks: number[][]): number {
    // 贪心：按 minimum - actual 降序排序，门槛差越大的越先做
    tasks.sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]));

    let ans = 0; // 总初始能量
    let cur = 0; // 当前剩余能量
    for (const [actual, minimum] of tasks) {
        if (cur < minimum) {
            ans += minimum - cur;
            cur = minimum;
        }
        cur -= actual;
    }
    return ans;
};
// @lc code=end

