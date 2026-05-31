/*
 * @lc app=leetcode.cn id=1857 lang=typescript
 *
 * [1857] 有向图中最大颜色值
 */

// @lc code=start
function largestPathValue(colors: string, edges: number[][]): number {
    // 收集所有入度为0 的节点
    const nodeLength = colors.length;
    const inDegree: number[] = new Array(nodeLength).fill(0);
    // 建立图
    const graph: number[][] = Array.from({ length: nodeLength }, () => []);
    for (let i = 0; i < edges.length; i++) {
        const [from, to] = edges[i];
        graph[from].push(to);
        inDegree[to]++;
    }

    // 从入度为 0 的节点开始 DFS
    // 记录每个节点作为起点，各条路线可以收集的最大颜色数量，用于剪枝
    const colorMap: Record<string, Record<string, number>> = {};

    function dfs(node: number, visited: Set<number>): false | Record<string, number> {
        // 如果已经访问过，说明有环，直接退出
        if (visited.has(node)) {
            return false;
        }

        // 如果已经访问过，就直接返回
        if (colorMap[node]) {
            return colorMap[node];
        }

        visited.add(node);

        const nexts = graph[node];

        // 能走到这里，说明当前节点没有被访问过，用一个 map 记录当前节点可以收集的最大颜色数量
        const colorNum: Record<string, number> = {};

        // 如果没有下一个节点，就看看能否大于 res
        for (let i = 0; i < nexts.length; i++) {
            const next = nexts[i];

            // 如果下一层返回 false，说明有环，直接退出
            const res = dfs(next, visited);

            if (!res) {
                return false;
            }

            for (const key in res) {
                colorNum[key] = Math.max(colorNum[key] || 0, res[key]);
            }
        }

        // 离开的时候要删除节点
        visited.delete(node);
        // 将这个节点的数据加入 map
        colorNum[colors[node]] = (colorNum[colors[node]] || 0) + 1;
        colorMap[node] = colorNum;

        return colorNum;
    }

    let res = -1;
    for (let i = 0; i < nodeLength; i++) {
        const data = dfs(i, new Set());

        if (!data) return -1;

        res = Math.max(res, ...Object.values(data));
    }

    return res;
};

// largestPathValue("aaa", [[1,2], [2,1]])
// @lc code=end

