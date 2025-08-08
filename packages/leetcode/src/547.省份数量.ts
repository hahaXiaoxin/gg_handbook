/*
 * @lc app=leetcode.cn id=547 lang=typescript
 *
 * [547] 省份数量
 */

// @lc code=start
class UnionFind {
    /**
     * 记录对应城市归属于哪个城市下
     */
    private parent: number[];

    /**
     * 记录当前城市的等级
     * 等级越高，说明下面城市的层级更多
     * 对应树的高度
     */
    private rank: number[];

    /**
     * 省份数量
     */
    private count: number;

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array.from({ length: n }, () => 0);
        this.count = n;
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            // 路径压缩：让树更加扁平
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) {
            return;
        }

        const rankX = this.rank[rootX];
        const rankY = this.rank[rootY];

        if (rankX < rankY) {
            this.parent[rootX] = rootY;
        } else if (rankX > rankY) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }

        this.count--;
    }

    getCount() {
        return this.count;
    }
}

function findCircleNum(isConnected: number[][]): number {
    const length = isConnected.length;

    const unionFind = new UnionFind(length);

    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
            if (isConnected[i][j]) {
                unionFind.union(i, j);
            }
        }
    }

    return unionFind.getCount();
}
// @lc code=end
