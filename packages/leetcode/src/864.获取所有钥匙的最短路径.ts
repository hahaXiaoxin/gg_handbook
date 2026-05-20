/*
 * @lc app=leetcode.cn id=864 lang=typescript
 *
 * [864] 获取所有钥匙的最短路径
 */

// @lc code=start
// 将钥匙转换为对应的二进制值
function keyToBit(key: string): number {
    return 1 << (key.charCodeAt(0) - 'a'.charCodeAt(0));
}

type StatusNode = [number, number, number, number];

/**
 * 基于 Set 简单封装
 */
class VisitedSet extends Set {
    public add(statusNode: StatusNode) {
        const key = statusNode.slice(0, 3).join('|');
        super.add(key);
        return this;
    }

    public has(statusNode: StatusNode) {
        const key = statusNode.slice(0, 3).join('|');
        return super.has(key);
    }
}

function shortestPathAllKeys(grid: string[]): number {
    let start: [number, number] = [-1, -1];
    let keyCount = 0;

    // 遍历一遍，找到起点和钥匙的数量
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '@') {
                start = [i, j];
            } else if (grid[i][j] >= 'a' && grid[i][j] <= 'f') {
                keyCount++;
            }
        }
    }

    // 所有钥匙的标记
    const allKeyMark = (1 << keyCount) - 1;

    // 起点就满足条件（极端情况）
    if (allKeyMark === 0) return 0;

    // 初始化 VisitSet
    const visitedSet = new VisitedSet();
    // 起点也要标记，避免绕回起点重复扩展
    visitedSet.add([start[0], start[1], 0, 0]);

    // 初始化队列
    let queue: StatusNode[] = [[start[0], start[1], 0, 0]];

    const directions: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (queue.length) {
        const nextQueue: StatusNode[] = [];

        for (let i = 0; i < queue.length; i++) {
            const [x, y, key, step] = queue[i];

            // 对四个方向进行 BFS
            for (const [dx, dy] of directions) {
                const res = pushNode([x + dx, y + dy, key, step + 1], nextQueue);
                if (res !== undefined) return res;
            }
        }

        queue = nextQueue;
    }

    return -1;

    // 将节点加入队列
    function pushNode(node: StatusNode, queue: StatusNode[]): number | undefined {
        let [x, y, keyMark, step] = node;

        // 越界则不管
        if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return;

        // 是墙壁则不管
        if (grid[x][y] === '#') return;

        // 如果是锁的话，判断当前是否

        // 是锁但没有钥匙则不管
        if (grid[x][y] >= 'A' && grid[x][y] <= 'F' && (keyMark & keyToBit(grid[x][y].toLowerCase())) === 0) return;

        // 是钥匙则获取钥匙
        if (grid[x][y] >= 'a' && grid[x][y] <= 'f') {
            keyMark |= keyToBit(grid[x][y]);
        }

        // 如果所有钥匙都获取了，则返回步数
        if (keyMark === allKeyMark) return step;

        const newNode: StatusNode = [x, y, keyMark, step];

        // 如果已经访问过了，则不管
        if (visitedSet.has(newNode)) return;

        // 标记为已访问
        visitedSet.add(newNode);

        queue.push(newNode);
    }
};
// @lc code=end

