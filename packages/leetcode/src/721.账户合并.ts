/*
 * @lc app=leetcode.cn id=721 lang=typescript
 *
 * [721] 账户合并
 */

// @lc code=start
function accountsMerge(accounts: string[][]): string[][] {
    // 并查集：parent[email] = email 的父节点
    const parent: Record<string, string> = {};
    // 记录每个 email 属于哪个 name（同一个 email 不会属于不同 name）
    const emailToName: Record<string, string> = {};

    const find = (x: string): string => {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]); // 路径压缩
        }
        return parent[x];
    };

    const union = (x: string, y: string) => {
        const rx = find(x);
        const ry = find(y);
        if (rx !== ry) {
            parent[rx] = ry;
        }
    };

    // 1. 初始化：每个 email 自成一个集合，并把同一账户内的 email 与第一个 email 合并
    for (const account of accounts) {
        const name = account[0];
        const firstEmail = account[1];
        for (let i = 1; i < account.length; i++) {
            const email = account[i];
            if (parent[email] === undefined) {
                parent[email] = email;
            }
            emailToName[email] = name;
            union(email, firstEmail);
        }
    }

    // 2. 按根节点把所有 email 聚合到一起
    const groups: Record<string, string[]> = {};
    for (const email of Object.keys(parent)) {
        const root = find(email);
        if (!groups[root]) groups[root] = [];
        groups[root].push(email);
    }

    // 3. 组装结果：name + 排序后的 emails
    const result: string[][] = [];
    for (const root of Object.keys(groups)) {
        const emails = groups[root].sort();
        result.push([emailToName[root], ...emails]);
    }

    return result;
};
// @lc code=end
