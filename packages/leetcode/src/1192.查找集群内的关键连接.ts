/*
 * @lc app=leetcode.cn id=1192 lang=typescript
 *
 * [1192] 查找集群内的关键连接
 */

// @lc code=start
function criticalConnections(n: number, connections: number[][]): number[][] {
    // 构建邻接表
    const graph: number[][] = new Array(n).fill(0).map(() => []);
    for (const [u, v] of connections) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const res: number[][] = [];
    const dfn: number[] = new Array(n).fill(-1);
    const low: number[] = new Array(n).fill(-1);
    let timestamp = 0;

    function dfs(node: number, parent?: number): void {
        dfn[node] = low[node] = timestamp++;

        for (const v of graph[node]) {
            if (dfn[v] === -1) {
                dfs(v, node);
                low[node] = Math.min(low[node], low[v]);

                if (low[v] > dfn[node]) {
                    res.push([node, v]);
                }
            }else if (v !== parent) {
                low[node] = Math.min(low[node], dfn[v]);
            }
        }
    }

    dfs(0)

    return res;
};

export {};
// @lc code=end

