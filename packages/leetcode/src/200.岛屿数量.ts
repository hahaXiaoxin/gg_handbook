/*
 * @lc app=leetcode.cn id=200 lang=typescript
 *
 * [200] 岛屿数量
 */

// @lc code=start
const LAND = '1';

function useUnionFind(grid: string[][]): number {
    class UnionFind {
        private _parent: Array<
            Array<{
                parent: [number, number];
                rank: number;
            }>
        >;

        private _count: number = 0;

        constructor(grid: string[][]) {
            this._parent = Array.from(grid, (row, x) => {
                return Array.from(row, (land, y) => {
                    if (land === LAND) {
                        this._count++;
                        return {
                            parent: [x, y],
                            rank: 0,
                        };
                    }

                    return {
                        parent: [-1, -1],
                        rank: 0,
                    };
                });
            });
        }

        find(x: number, y: number) {
            const parentPosi = this._parent[x][y].parent;

            if (parentPosi[0] === -1) {
                throw new Error('越界警告');
            }

            if (parentPosi[0] !== x || parentPosi[1] !== y) {
                this._parent[x][y].parent = this.find(parentPosi[0], parentPosi[1]);
            }

            return this._parent[x][y].parent;
        }

        union(pointA: [number, number], pointB: [number, number]) {
            const rootA = this.find(...pointA);
            const rootB = this.find(...pointB);

            if (rootA[0] === rootB[0] && rootA[1] === rootB[1]) {
                return;
            }

            const rankA = this._parent[rootA[0]][rootA[1]].rank;
            const rankB = this._parent[rootB[0]][rootB[1]].rank;

            if (rankA < rankB) {
                this._parent[rootA[0]][rootA[1]].parent = rootB;
            } else if (rankB < rankA) {
                this._parent[rootB[0]][rootB[1]].parent = rootA;
            } else {
                this._parent[rootB[0]][rootB[1]].parent = rootA;
                this._parent[rootA[0]][rootA[1]].rank++;
            }

            this._count--;
        }

        get count() {
            return this._count;
        }
    }
    const m = grid.length;
    const n = grid[0].length;

    const unionFind = new UnionFind(grid);

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const cur = grid[i][j];

            if (cur !== LAND) {
                continue;
            }

            if (j + 1 < n && grid[i][j + 1] === LAND) {
                unionFind.union([i, j], [i, j + 1])
            }

            if (i + 1 < m && grid[i + 1][j] === LAND) {
                unionFind.union([i, j], [i + 1, j])
            }
        }
    }

    return unionFind.count;
}

function numIslands(grid: string[][]): number {
    return useUnionFind(grid);
}
// @lc code=end
