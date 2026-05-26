/*
 * @lc app=leetcode.cn id=417 lang=typescript
 *
 * [417] 太平洋大西洋水流问题
 */

// @lc code=start
const Directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

function pacificAtlantic(heights: number[][]): number[][] {
    const m = heights.length, n = heights[0].length;
    
    // 分别记录从太平洋（大西洋）可以流经的格子
    const pac = new Array(m).fill(0).map(() => new Array(n).fill(false));
    const atl = new Array(m).fill(0).map(() => new Array(n).fill(false));

    // dfs 深度遍历，将节点加入到对应的集合中
    function dfs(position: [number, number], set: boolean[][]) {
        const [x, y] = position;
        set[x][y] = true;

        for (let [dx, dy] of Directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                nx < 0 ||
                nx >= m ||
                ny < 0 ||
                ny >= n ||
                set[nx][ny] ||
                heights[nx][ny] < heights[x][y]
            ) {
                continue;
            }

            dfs([nx, ny], set);
        }
    }

    // 从太平洋（大西洋）开始遍历
    for (let i = 0; i < m; i++) {
        dfs([i, 0], pac);
        dfs([i, n - 1], atl);
    }
    for (let i = 0; i < n; i++) {
        dfs([0, i], pac);
        dfs([m - 1, i], atl);
    }

    // 找出两个集合的交集
    const result: number[][] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (pac[i][j] && atl[i][j]) {
                result.push([i, j]);
            }
        }
    }

    return result;
};
// @lc code=end

