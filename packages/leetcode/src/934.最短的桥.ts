/*
 * @lc app=leetcode.cn id=934 lang=typescript
 *
 * [934] 最短的桥
 */

// @lc code=start
function shortestBridge(grid: number[][]): number {
    // 1. 找到第一座岛
    const startLand = (() => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] === 1) {
                    return [i, j];
                }
            }
        }
    })();

    // 通过 start 找到整块相连的岛, null 作为广度优先的分隔符
    const firstLand = [...bfs(startLand as [number, number]), null];

    function bfs(start: [number, number]): Array<[number, number]> {
        const queue: Array<[number, number]> = [start];
        let startTemp = 0;// 只需要将节点推入队列，但是不要丢弃

        while (startTemp < queue.length) {
            const [x, y] = queue[startTemp++];

            // 添加四面八方的节点
            if (x > 0 && grid[x - 1][y] === 1) {
                queue.push([x - 1, y]);
                grid[x - 1][y] = 0;
            }

            if (x < grid.length - 1 && grid[x + 1][y] === 1) {
                queue.push([x + 1, y]);
                grid[x + 1][y] = 0;
            }

            if (y > 0 && grid[x][y - 1] === 1) {
                queue.push([x, y - 1]);
                grid[x][y - 1] = 0;
            }

            if (y < grid[0].length - 1 && grid[x][y + 1] === 1) {
                queue.push([x, y + 1]);
                grid[x][y + 1] = 0;
            }
        }
        
        // 添加完之后，恢复岛屿，设置为 -1 表示第一座岛屿
        for (const [x, y] of queue) {
            grid[x][y] = -1;
        }

        return queue;
    }

    let res = 0;

    while (firstLand.length) {
        const currentPosition = firstLand.shift();

        // 如果返回 null，说明这一层遍历完了
        if (!currentPosition) {
            res++;
            firstLand.push(null);
            continue;
        }

        const [x, y] = currentPosition;

        // 如果是 0，说明是海洋，可以继续扩展
        if (x > 0 && grid[x - 1][y] !== -1) {
            if (grid[x - 1][y] === 1) return res;

            firstLand.push([x - 1, y]);
            grid[x - 1][y] = -1;
        }

        if (x < grid.length - 1 && grid[x + 1][y] !== -1) {
            if (grid[x + 1][y] === 1) return res;

            firstLand.push([x + 1, y]);
            grid[x + 1][y] = -1;
        }

        if (y > 0 && grid[x][y - 1] !== -1) {
            if (grid[x][y - 1] === 1) return res;

            firstLand.push([x, y - 1]);
            grid[x][y - 1] = -1;
        }

        if (y < grid[0].length - 1 && grid[x][y + 1] !== -1) {
            if (grid[x][y + 1] === 1) return res;

            firstLand.push([x, y + 1]);
            grid[x][y + 1] = -1;
        }
    }

    return res;
};

// @lc code=end

