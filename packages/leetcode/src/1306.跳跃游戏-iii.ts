/*
 * @lc app=leetcode.cn id=1306 lang=typescript
 *
 * [1306] 跳跃游戏 III
 */

// @lc code=start
function canReach(arr: number[], start: number): boolean {
    function dfs(start: number): boolean {
        // 超出边界的节点不再考虑
        if (start < 0 || start >= arr.length) return false;

        // 已经访问过的节点不再考虑
        if (arr[start] === -1) {
            return false;
        }

        if (arr[start] === 0) {
            return true;
        }

        const step = arr[start];
        arr[start] = -1

        const res = Boolean(dfs(start + step) || dfs(start - step));

        return res;
    }

    return dfs(start);
};

// @lc code=end

