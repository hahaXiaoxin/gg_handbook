/*
 * @lc app=leetcode.cn id=1615 lang=typescript
 *
 * [1615] 最大网络秩
 */

// @lc code=start
function maximalNetworkRank(n: number, roads: number[][]): number {
    // 记录节点之间的关系
    const grid = new Array(n).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < roads.length; i++) {
        const [a, b] = roads[i];
        grid[a][b] = 1;
        grid[b][a] = 1;
    }

    let result = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            result = Math.max(result, grid[i].reduce((a, b) => a + b, 0) + grid[j].reduce((a, b) => a + b, 0) - grid[i][j]);
        }
    }

    return result;
};
// @lc code=end

