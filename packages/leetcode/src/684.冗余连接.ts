/*
 * @lc app=leetcode.cn id=684 lang=typescript
 *
 * [684] 冗余连接
 */

// @lc code=start
class UnionNode {
    private _parent: UnionNode = this;
    private _rank: number = 0;

    get parent() {
        return this._parent;
    }

    set parent(v: UnionNode) {
        this._parent = v;
    }

    get rank() {
        return this._rank;
    }

    set rank(v: number) {
        this._rank = v;
    }

    getRoot(this: UnionNode) {
        let root = this;

        while (root.parent !== root) {
            root = root.parent;
        }

        this.parent = root;

        return root;
    }

    unionNode(node: UnionNode) {
        const curRoot = this.getRoot();
        const nodeRoot = node.getRoot();

        if (curRoot === nodeRoot) {
            return;
        }

        const rankA = curRoot._rank;
        const rankB = nodeRoot._rank;

        if (rankA < rankB) {
            curRoot.parent = nodeRoot;
        }else if (rankB < rankA) {
            nodeRoot.parent = curRoot;
        }else {
            nodeRoot.parent = curRoot;
            curRoot.rank++;
        }
    }

    isUnion(node: UnionNode): boolean {
        const curRoot = this.getRoot();
        const nodeRoot = node.getRoot();

        return curRoot === nodeRoot;
    }
}

function findRedundantConnection(edges: number[][]): number[] {
    const map = new Map<number, UnionNode>();

    let res: number[] = [];

    for (let i = 0; i < edges.length; i++) {
        const line = edges[i];
        const nodeA = map.get(line[0]) ?? new UnionNode();
        const nodeB = map.get(line[1]) ?? new UnionNode();

        if (nodeA.isUnion(nodeB)) {
            res = line;
            continue;
        }

        nodeA.unionNode(nodeB);

        map.set(line[0], nodeA)
        map.set(line[1], nodeB)
    }

    return res;
}
// @lc code=end
