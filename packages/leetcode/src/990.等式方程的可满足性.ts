/*
 * @lc app=leetcode.cn id=990 lang=typescript
 *
 * [990] 等式方程的可满足性
 */

// @lc code=start
class UnionFind {
    public parent: Record<string, string> = {};

    public find(x: string) {
        if (!this.parent[x]) {
            this.parent[x] = x;
        }

        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }

        return this.parent[x];
    }

    public union(x: string, y: string) {
        const xParent = this.find(x);
        const yParent = this.find(y);

        if (xParent !== yParent) {
            this.parent[xParent] = yParent;
        }
    }
}

enum EquationType {
    Equal = '==',
    NotEqual = '!=',
}

function equationsPossible(equations: string[]): boolean {
    const unionFind = new UnionFind();
    const notEquals: string[] = [];

    for (let i = 0; i < equations.length; i++) {
        if (equations[i].includes(EquationType.NotEqual)) {
            notEquals.push(equations[i]);
            continue;
        }

        const [a, b] = equations[i].split(EquationType.Equal);
        unionFind.union(a, b);
    }

    for (let i = 0; i < notEquals.length; i++) {
        const [a, b] = notEquals[i].split(EquationType.NotEqual);
        if (unionFind.find(a) === unionFind.find(b)) {
            return false;
        }
    }

    return true;
};

export {};
// @lc code=end

