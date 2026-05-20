/*
 * @lc app=leetcode.cn id=1091 lang=typescript
 *
 * [1091] 二进制矩阵中的最短路径
 */

// @lc code=start
const DIRS: ReadonlyArray<readonly [number, number]> = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
];

function shortestPathBinaryMatrix(grid: number[][]): number {
    const n = grid.length;
    if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;
    if (n === 1) return 1;

    // 用一维数组当队列，双指针代替 shift，避免 O(n) 的元素搬移
    let queue: number[] = [0]; // 编码为 x * n + y
    grid[0][0] = 1; // 直接复用 grid 作为 visited，省一份内存
    let step = 1;

    while (queue.length) {
        const next: number[] = [];
        for (let i = 0; i < queue.length; i++) {
            const code = queue[i];
            const x = (code / n) | 0;
            const y = code - x * n;

            if (x === n - 1 && y === n - 1) return step;

            for (let d = 0; d < 8; d++) {
                const nx = x + DIRS[d][0];
                const ny = y + DIRS[d][1];
                if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
                if (grid[nx][ny] !== 0) continue;
                grid[nx][ny] = 1; // 入队即标记，避免重复入队
                next.push(nx * n + ny);
            }
        }
        queue = next;
        step++;
    }

    return -1;
};
// @lc code=end

