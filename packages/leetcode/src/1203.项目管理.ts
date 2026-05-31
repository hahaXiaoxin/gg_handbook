/*
 * @lc app=leetcode.cn id=1203 lang=typescript
 *
 * [1203] 项目管理
 */

// @lc code=start
function sortItems(n: number, m: number, group: number[], beforeItems: number[][]): number[] {
    // 1. 给没有组的项目分配独立的新组号（每个项目自成一组）
    let groupId = m;
    for (let i = 0; i < n; i++) {
        if (group[i] === -1) {
            group[i] = groupId++;
        }
    }

    // 2. 构建两张图
    //    - groupGraph: 组间依赖图
    //    - itemGraph:  组内项目依赖图
    const groupGraph: number[][] = Array.from({ length: groupId }, () => []);
    const groupInDegree: number[] = new Array(groupId).fill(0);

    const itemGraph: number[][] = Array.from({ length: n }, () => []);
    const itemInDegree: number[] = new Array(n).fill(0);

    // 按每个项目的依赖关系填两张图
    for (let cur = 0; cur < n; cur++) {
        for (const pre of beforeItems[cur]) {
            if (group[pre] === group[cur]) {
                // 同组 -> 项目内部依赖
                itemGraph[pre].push(cur);
                itemInDegree[cur]++;
            } else {
                // 不同组 -> 组间依赖
                groupGraph[group[pre]].push(group[cur]);
                groupInDegree[group[cur]]++;
            }
        }
    }

    // 3. 通用的拓扑排序函数（Kahn / BFS）
    const topoSort = (nodes: number[], graph: number[][], inDegree: number[]): number[] => {
        const queue: number[] = [];
        const indeg = inDegree.slice();
        for (const node of nodes) {
            if (indeg[node] === 0) queue.push(node);
        }
        const result: number[] = [];
        while (queue.length) {
            const cur = queue.shift()!;
            result.push(cur);
            for (const next of graph[cur]) {
                if (--indeg[next] === 0) queue.push(next);
            }
        }
        return result.length === nodes.length ? result : [];
    };

    // 4. 对组做拓扑排序
    const groupOrder = topoSort(
        Array.from({ length: groupId }, (_, i) => i),
        groupGraph,
        groupInDegree
    );
    if (groupOrder.length === 0) return [];

    // 5. 对所有项目做一次整体拓扑排序，得到全局有效的项目顺序
    const itemOrder = topoSort(
        Array.from({ length: n }, (_, i) => i),
        itemGraph,
        itemInDegree
    );
    if (itemOrder.length === 0) return [];

    // 6. 按组分桶：把项目顺序里的每个项目按组归类
    //    因为 itemOrder 已经是合法的拓扑序，所以同组项目在桶里也是有序的
    const groupToItems = new Map<number, number[]>();
    for (const item of itemOrder) {
        const g = group[item];
        if (!groupToItems.has(g)) groupToItems.set(g, []);
        groupToItems.get(g)!.push(item);
    }

    // 7. 按组的拓扑顺序，依次输出每个组里的项目
    const result: number[] = [];
    for (const g of groupOrder) {
        const items = groupToItems.get(g);
        if (items) result.push(...items);
    }
    return result;
};
// @lc code=end
