/*
 * @lc app=leetcode.cn id=863 lang=typescript
 *
 * [863] 二叉树中所有距离为 K 的结点
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// declare class TreeNode {
//     val: number
//     left: TreeNode | null
//     right: TreeNode | null
// }

function distanceK(root: TreeNode, target: TreeNode | null, k: number): number[] {
    const res: Set<number> = new Set();

    // 首先深度优先找到对应的节点，找到节点后，开始回溯，就是距离当前节点的距离 = k - (当前节点到 target 的距离)
    function dfs(node: TreeNode): number {

        // 如果找到了target，则先获取距离 target 为 k 的子节点
        if (node.val === target?.val) {
            findDistanceSubNode(node, k).forEach(i => res.add(i));

            // 回到上一层，表示上一层的节点距离 target 的距离为 1
            return 1;
        }

        const leftDistance = node.left === null ? -1 : dfs(node.left);
        // 一点小技巧，如果 target 节点在左边，右边就不需要探路了
        const rightDistance = node.right === null || leftDistance !== -1 ?  -1 : dfs(node.right);

        // 看看 target 是否为 node 的后代节点
        const distance = Math.max(leftDistance, rightDistance);

        if (distance > 0 && k - distance >= 0) {
            // 如果 target 为 node 的后代节点，那么就开始寻找距离 node 为 k - distance 的子节点
            // 这里传入 left | right 是因为，假设 target 在左边，那么只需要找当前节点右边的子孙节点就好了，可以优化性能
            findDistanceSubNode(node, k - distance, new Set(), leftDistance === -1 ? 'left' : 'right').forEach(i => res.add(i));
        }

        return distance === -1 ? -1 : distance + 1;
    }

    // 返回符合距离的子节点
    function findDistanceSubNode(node: TreeNode, distance: number, set: Set<number> = new Set(), leftOrRight?: 'left' | 'right'): Set<number> {
        // 如果distance === 0，说明找的就是当前节点
        if (distance === 0) {
            set.add(node.val);
            return set;
        }

        if (leftOrRight !== 'right' && node.left) {
            findDistanceSubNode(node.left, distance - 1, set);
        }

        if (leftOrRight !== 'left' && node.right) {
            findDistanceSubNode(node.right, distance - 1, set);
        }

        return set;
    }

    dfs(root);

    return Array.from(res);
};

// @lc code=end

