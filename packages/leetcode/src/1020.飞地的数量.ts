/*
 * @lc app=leetcode.cn id=1020 lang=typescript
 *
 * [1020] 飞地的数量
 */

// @lc code=start
function numEnclaves(grid: number[][]): number {
    // 记录有多少岛不能逃逸，其实就是所有岛的数量 - 可逃逸的岛的数量
    let res = grid.reduce((acc, cur) => {
        return cur.reduce((acc, cur) => {
            if (cur === 1) {
                return acc + 1;
            }
            return acc;
        }, acc);
    }, 0);
    

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            // 遇到一个岛，就将这个岛加入 res
            if (grid[i][j] !== 1) {
                continue;
            }

            if (!(i === 0 || i === grid.length - 1 || j === 0 || j === grid[i].length - 1)) continue;


            const queue: [number, number][] = [[i, j]];
            grid[i][j] = 0;
            let enclavesNum = 1;

            while (queue.length) {
                const [x, y] = queue.shift()!;

                for (let [dx, dy] of [
                    [0, 1],
                    [0, -1],
                    [1, 0],
                    [-1, 0],
                ]) {
                    const nx = x + dx;
                    const ny = y + dy;

                    if (
                        nx < 0 ||
                        nx >= grid.length ||
                        ny < 0 ||
                        ny >= grid[0].length ||
                        grid[nx][ny] !== 1
                    ) {
                        continue;
                    }

                    queue.push([nx, ny]);
                    grid[nx][ny] = 0;
                    enclavesNum++;
                }
            }

            res -= enclavesNum;
        }
    }

    return res;
};
// @lc code=end

