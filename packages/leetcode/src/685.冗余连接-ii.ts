/*
 * @lc app=leetcode.cn id=685 lang=typescript
 *
 * [685] 冗余连接 II
 */

// @lc code=start
class DisjointSetUnion685 {
    private parent: number[];

    constructor(size: number) {
        this.parent = Array.from({ length: size + 1 }, (_, i) => i);
    }

    find(node: number): number {
        if (this.parent[node] !== node) {
            this.parent[node] = this.find(this.parent[node]);
        }
        return this.parent[node];
    }

    union(a: number, b: number): boolean {
        const rootA = this.find(a);
        const rootB = this.find(b);
        if (rootA === rootB) return false;

        this.parent[rootB] = rootA;
        return true;
    }
}

function findRedundantDirectedConnection(edges: number[][]): number[] {
    const n = edges.length;

    // 1) 首扫：找“入度为 2”的节点，记录两条边 e1、e2
    const parent: number[] = Array(n + 1).fill(0);
    let candidate1: number[] | null = null; // 先出现的父边
    let candidate2: number[] | null = null; // 后出现的父边（冲突边）

    for (const [u, v] of edges) {
        if (parent[v] === 0) {
            parent[v] = u;
        } else {
            // v 有两条入边
            candidate1 = [parent[v], v];
            candidate2 = [u, v];
            break;
        }
    }

    // 2) 用 DSU 判环。若存在 candidate2，则在合并时跳过 candidate2
    const dsu = new DisjointSetUnion685(n);
    for (const [u, v] of edges) {
        if (candidate2 && u === candidate2[0] && v === candidate2[1]) {
            continue; // 暂时跳过冲突的第二条边
        }
        if (!dsu.union(u, v)) {
            // 发现成环
            if (!candidate1) {
                // 无二父情形：直接返回造成环的边
                return [u, v];
            }
            // 有二父情形：跳过 candidate2 仍成环 → 应删除 candidate1
            return candidate1;
        }
    }

    // 3) 若未成环：仅存在二父情形，删除 candidate2 即可
    return candidate2!;
}
// @lc code=end

