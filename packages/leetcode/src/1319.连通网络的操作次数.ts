/*
 * @lc app=leetcode.cn id=1319 lang=typescript
 *
 * [1319] 连通网络的操作次数
 */

// @lc code=start
export class UnionFind {
    private _parent: number[];

    constructor(n: number) {
        this._parent = Array.from({ length: n }, (_, i) => i);
    }

    public find(x: number): number {
        let cur = x;

        while (this._parent[cur] !== cur) {
            cur = this._parent[cur];
        }

        this._parent[x] = cur;

        return cur;
    }

    public union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            this._parent[rootY] = rootX;
        }
    }

    get parent(): number[] {
        return this._parent;
    }
}

function makeConnected(n: number, connections: number[][]): number {
    if (connections.length < n - 1) {
        return -1;
    }

    const uf = new UnionFind(n);

    for (const [a, b] of connections) {
        uf.union(a, b);
    }

    return new Set(uf.parent.map(i => uf.find(i))).size - 1;
};
// @lc code=end

