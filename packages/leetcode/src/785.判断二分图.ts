/*
 * @lc app=leetcode.cn id=785 lang=typescript
 *
 * [785] 判断二分图
 */

// @lc code=start
enum Color {
    None = 0,
    Red = 1,
    Blue = -1,
};

function isBipartite(graph: number[][]): boolean {
    const color: Color[] = new Array(graph.length).fill(Color.None);

    for(let i  = 0; i < graph.length; i++) {
        if (color[i] !== Color.None) continue;

        if (!setColorByDfs(i, Color.Red)) return false;
    }

    return true;

    function setColorByDfs(iNode: number, colorBySet: Color): boolean {
        if (color[iNode] !== Color.None) {
            // 已染色：颜色一致 → 安全返回；不一致 → 冲突
            return color[iNode] === colorBySet;
        }

        color[iNode] = colorBySet;

        for (let i = 0; i < graph[iNode].length; i++) {
            if (!setColorByDfs(graph[iNode][i], -colorBySet)) return false;
        }

        return true;
    }
};
// @lc code=end

