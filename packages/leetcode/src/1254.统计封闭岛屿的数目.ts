/*
 * @lc app=leetcode.cn id=1254 lang=typescript
 *
 * [1254] 统计封闭岛屿的数目
 */

// @lc code=start
/**
 * 从一个岛屿开始，把整个岛屿标记为海洋
 */
const Land = 0;
const Ocean = 1;

const Directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

function setLandToOceanByBfs(position: [number, number], grid: number[][]) {
    const stack: [number, number][] = [position];
    grid[position[0]][position[1]] = Ocean;

    let temp = 0;

    while (temp >=0) {
        const [x, y] = stack[temp--];

        for (let [dx, dy] of Directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                nx < 0 ||
                nx >= grid.length ||
                ny < 0 ||
                ny >= grid[0].length ||
                grid[nx][ny] !== Land
            ) {
                continue;
            }

            stack[++temp] = [nx, ny];
            grid[nx][ny] = Ocean;
        }
    }
}

function closedIsland(grid: number[][]): number {
    // 先遍历一遍边缘，把所有靠近封闭区域的岛设置为海洋
    const m = grid.length, n = grid[0].length;
    for (let i = 0; i < m; i++) {
        const row = grid[i];
        for (let j = 0; j < n; j++) {
            // 只处理边界格子
            if ((i === 0 || i === m - 1 || j === 0 || j === n - 1) && row[j] === Land) {
                setLandToOceanByBfs([i, j], grid);
            }
        }
    }

    let res = 0;

    // 在遍历一遍整个网格，把所有岛设置为海洋，同时记录 bfs 执行了多少次，说明有多少个孤岛
    for (let i = 1; i < m - 1; i++) {
        const row = grid[i];
        for (let j = 1; j < n - 1; j++) {
            if (row[j] === Land) {
                setLandToOceanByBfs([i, j], grid);
                res++;
            }
        }
    }

    return res;
};
// @lc code=end

