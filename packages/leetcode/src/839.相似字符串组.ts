/*
 * @lc app=leetcode.cn id=839 lang=typescript
 *
 * [839] 相似字符串组
 */

// @lc code=start
class UnionFind {
    public parent: Record<string, string> = {};

    public find(x: string) {
        if (this.parent[x] === undefined) {
            this.parent[x] = x;
        }

        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }

        return this.parent[x];
    }

    public union(x: string, y: string) {
        this.parent[this.find(x)] = this.find(y);
    }
}

function isSimilar(x: string, y: string) {
    let diff = 0;
    for (let i = 0; i < x.length; i++) {
        if (x[i] !== y[i]) {
            diff++;
        }
    }
    return diff === 0 || diff === 2;
}

function numSimilarGroups(strs: string[]): number {
    const unionFind = new UnionFind();

    for (let i = 0; i < strs.length; i++) {
        for (let j = i + 1; j < strs.length; j++) {
            if (isSimilar(strs[i], strs[j])) {
                unionFind.union(strs[i], strs[j]);
            }
        }
    }

    const map = new Map<string, string[]>();

    for (let i = 0; i < strs.length; i++) {
        const root = unionFind.find(strs[i]);
        if (!map.has(root)) {
            map.set(root, []);
        }
        map.get(root)!.push(strs[i]);
    }

    return map.size
};

export {}
// @lc code=end

