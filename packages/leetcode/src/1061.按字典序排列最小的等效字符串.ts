/*
 * @lc app=leetcode.cn id=1061 lang=typescript
 *
 * [1061] 按字典序排列最小的等效字符串
 */

// @lc code=start
class UnionFind {
    public parent: Record<string, string> = {};

    public find(char: string): string {
        if (this.parent[char] === undefined) {
            this.parent[char] = char;
        }

        if (this.parent[char] !== char) {
            this.parent[char] = this.find(this.parent[char]);
        }

        return this.parent[char];
    }

    public union(x: string, y: string) {
        const xParent = this.find(x);
        const yParent = this.find(y);

        if (xParent !== yParent) {
            const [minChar, maxChar] = xParent.charCodeAt(0) < yParent.charCodeAt(0) ? [xParent, yParent] : [yParent, xParent];

            this.parent[maxChar] = minChar;
        }
    }
}

function smallestEquivalentString(s1: string, s2: string, baseStr: string): string {
    const length = s1.length;
    const unionFind = new UnionFind();

    for (let i = 0; i < length; i++) {
        unionFind.union(s1[i], s2[i]);
    }

    let result = '';

    for (let i = 0; i < baseStr.length; i++) {
        result += unionFind.find(baseStr[i]);
    }

    return result;
};

export {}
// @lc code=end

