/*
 * @lc app=leetcode.cn id=1557 lang=typescript
 *
 * [1557] 可以到达所有点的最少点数目
 */

// @lc code=start
/**
 * 思路：
 * 1. 题目保证是有向无环图（DAG）
 * 2. 入度为 0 的节点无法被其他节点到达，必须作为起点
 * 3. 入度不为 0 的节点，沿反向边追溯（DAG 无环），最终一定能从某个入度为 0 的节点到达
 * 4. 所以答案就是所有入度为 0 的节点
 */
function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
    // 标记哪些节点有入度
    const hasIncoming: boolean[] = new Array(n).fill(false);
    for (const [, to] of edges) {
        hasIncoming[to] = true;
    }

    const result: number[] = [];
    for (let i = 0; i < n; i++) {
        if (!hasIncoming[i]) {
            result.push(i);
        }
    }
    return result;
};
// @lc code=end

