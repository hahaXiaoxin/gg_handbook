/*
 * @lc app=leetcode.cn id=1926 lang=typescript
 *
 * [1926] 迷宫中离入口最近的出口
 */

// @lc code=start
const road = '.';
const wall = '+';

function nearestExit(maze: string[][], entrance: number[]): number {
    // 定义栈
    let stack: Array<[number, number]> = [[entrance[0], entrance[1]]];

    // 表示走了几步
    let step = 0;
    while(stack.length) {
        let nextStack: Array<[number, number]> = [];

        while(stack.length) {
            const [x, y] = stack.pop()!;

            // 如果这个节点是出口并且不是起点，直接返回
            if ((x === 0 || x === maze.length - 1 || y === 0 || y === maze[0].length - 1) && (x !== entrance[0] || y !== entrance[1])) return step;

            // 判断四个方向
            if (x > 0 && maze[x - 1][y] === road) {
                nextStack.push([x - 1, y]);
                // 入队的时候就标记
                maze[x - 1][y] = wall;
            }

            if (x < maze.length - 1 && maze[x + 1][y] === road){
                nextStack.push([x + 1, y]);
                maze[x + 1][y] = wall;
            }

            if (y > 0 && maze[x][y - 1] === road) {
                nextStack.push([x, y - 1]);
                maze[x][y - 1] = wall;
            }

            if (y < maze[0].length - 1 && maze[x][y + 1] === road) {
                nextStack.push([x, y + 1]);
                maze[x][y + 1] = wall;
            }
        }

        step++;
        stack = nextStack;
    }

    return -1;
};
// @lc code=end

