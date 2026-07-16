/*
 * @lc app=leetcode.cn id=3161 lang=typescript
 *
 * [3161] 物块放置查询
 */

// @lc code=start

/* ============================================================
 * 思路：
 *  设 gap[i] = i - (位置 i 左侧最近障碍物的位置)
 *  物块长度 = 右端点 - 左端点（端点可紧贴障碍物），gap[i] 即以 i 为右端点可放的最大物块大小
 *  - 查询 [2, x, sz]：等价于 max(gap[0..x]) >= sz
 *  - 插入 [1, x]：找到 x 在有序集合中的后继 nxt，
 *    则区间 [x+1, nxt] 内每个位置 i 的 gap[i] 变为 i - x
 *    （注意：x 自身 gap 不变；nxt 是下一障碍物，其 gap 也要从 nxt-prev 更新为 nxt-x）
 *
 * 数据结构：
 *  1) 跳表 SortedList：维护障碍物的位置，O(log n) 查后继
 *  2) 线段树（带懒标记）：
 *     - 维护区间内 gap 最大值
 *     - 懒标记 lazy 表示「该区间被整体赋值过，左端障碍物位于 lazy」
 *       下传时，子区间 [l, r] 的最大 gap = r - lazy（gap 单调递增，最大值在右端点）
 * ========================================================= */

// ---------- 跳表（SortedList，仅实现需要的接口） ----------
class SkipNode {
    val: number;
    next: SkipNode[];
    constructor(val: number, level: number) {
        this.val = val;
        this.next = new Array(level).fill(null);
    }
}

// #region 自实现跳表（SortedList） ----------
class SortedList {
    private static readonly MAX_LEVEL = 16;
    private static readonly P = 0.5;    // 内置变量，表示扩大层级的概率
    private head: SkipNode = new SkipNode(-Infinity, SortedList.MAX_LEVEL);
    private level: number = 1;

    /** 插入节点时，随机分配这个节点的层级（实际上是代表 0~lv 层） */
    private randomLevel(): number {
        let lv = 1;
        while (lv < SortedList.MAX_LEVEL && Math.random() < SortedList.P) {
            lv++;
        }
        return lv;
    }

    /** 插入节点 */
    public add(val: number): void {
        // 找到要插入的节点的后驱
        const update: SkipNode[] = new Array(SortedList.MAX_LEVEL).fill(this.head); // 默认指向 head，后续会更新
        let cur = this.head; // 从起点开始，向后查找

        // 层级从高往低，每个层级中最后一个小于 val 的节点（因为要插入到这个节点的后面）
        for (
            let i = this.level - 1; // level 表示层数，不是下标
            i >= 0;
            i--
        ) {
            while (cur.next[i] !== null && cur.next[i].val < val) {
                cur = cur.next[i];
            }
            update[i] = cur;
        }

        // 初始化要插入的 SkipNode
        const lv = this.randomLevel();
        const node =  new SkipNode(val, lv);

        // 如果 lv 更大，更新 this.level
        if (lv > this.level) {
            this.level = lv;
        }

        /**
         * 开始执行插入逻辑
         * 
         * 插入逻辑：
         * 1. 在前面，我们已经找到了当前 val 在各个层级中的前驱节点，都存到了 update 之中
         * 2. 现在我们要插入一个节点，这个节点第一次出现的层级是第 lv 层（数组中是 lv - 1）
         * 3. 那么只需要将第 i 层（ 1 <= i <= lv）的数据进行更新，将 node 的后驱更新为 update[i] 这个节点的同层后驱节点 .next[i]
         * 4. update[i]表示第 i 层中 val 的前驱节点，所以让 update[i].next[i] = node
         */
        for (let i = 0; i < lv; i++) {
            node.next[i] = update[i].next[i];
            update[i].next[i] = node;
        }
    }

    /** 返回大于 val 的最小元素 */
    public findHigher(val: number): number {
        let cur = this.head;
        for (let i = this.level - 1; i >= 0; i--) {
            while(cur.next[i] !== null && cur.next[i].val <= val) {
                cur = cur.next[i];
            }
        }

        // 第 1 层（下标为0）才是没有“跳过”的排序
        return cur.next[0] === null ? Infinity : cur.next[0].val;
    }

    /** 是否包含 val */ 
    public has(val: number): boolean {
        let cur = this.head;
        for (let i = this.level - 1; i >= 0; i--) {
            while (cur.next[i] !== null && cur.next[i].val <= val) {
                cur = cur.next[i];
            }
        }
        return cur.val === val;
    }
}
// #endregion

class SegTree {
    /** 线段树的大小 */
    private n: number;
    /** mx[i]表示区间[0, i]之间的最大值 */
    private mx: number[];
    /** 懒标记，lazy[i]表示节点 i 的左侧第一个障碍物坐标 */
    private lazy: number[];

    constructor(n: number) {
        this.n = n; // 初始化线段树的大小
        const size = 4 * n; // mx 和 lazy 的大小，线段树本质上是个树结构，完全二叉树，当叶子节点为 n 时，总节点数量为 2n - 1，但是题目中的情况不一定是完全二叉树，最坏情况是 4n
        this.mx = new Array(size).fill(0);
        this.lazy = new Array(size).fill(-1);
        this.build(1, 0, n - 1);
    }

    /**
     * 构造对应节点
     * @param o 节点编号
     * @param l 区间左端点  这个是根据 n 来定的，表示对应节点管辖的区间大小
     * @param r 区间右端点  和 l 同理
     */
    private build(o: number, l: number, r: number) {
        if (l === r) {
            // 初始化的时候所有位置的最大值都为自身下标
            this.mx[o] = l;
            return;
        }
        const mid = (l + r) >> 1;
        this.build(o * 2, l, mid);
        this.build(o * 2 + 1, mid + 1, r);
        this.mx[o] = Math.max(this.mx[o * 2], this.mx[o * 2 + 1]);
    }

    /** 
     * 更新节点 o 所在区间内的值，表示在区间 o 内，r 的左侧障碍物位置为 v，这里不需要 l 
     * 
     * 此处可能会有的疑问：为什么保证 r 和 v 中间没有障碍物？
     * 答：这个在业务逻辑中已经处理了，保证 r 和 v 之间是空的
     */
    private apply(o: number, r: number, v: number) {
        this.mx[o] = r - v;
        this.lazy[o] = v;
    }

    /** 下放懒标记，当读取到区间 o 内的子区间时，需要将 o 中的懒标记下方，避免数据有误差 */
    private pushDown(o: number, l: number, r: number){
        if (this.lazy[o] !== -1) {
            const mid = (l + r) >> 1;
            this.apply(o * 2, mid, this.lazy[o]);
            this.apply(o * 2 + 1, r, this.lazy[o]);
            this.lazy[o] = -1;
        }
    }

    /** 区间更新 */
    update(ql: number, qr: number, v: number):void {
        if (ql > qr) return;
        this._update(1, 0, this.n - 1, ql, qr, v);
    } 

    private _update(o: number, l: number, r: number, ql: number, qr: number, v: number) {
        if (ql <= l && r <= qr) {
            this.apply(o, r, v);
            return;
        }
        this.pushDown(o, l, r);
        const mid = (l + r) >> 1;
        if (ql <= mid) {
            this._update(o * 2, l, mid, ql, qr, v);
        }
        if (qr > mid) {
            this._update(o * 2 + 1, mid + 1, r, ql, qr, v);
        }
        this.mx[o] = Math.max(this.mx[o * 2], this.mx[o * 2 + 1]);
    }

    // 查询 [ql, qr] 内的最大 gap
    query(ql: number, qr: number): number {
        if (ql > qr) return 0;
        return this._query(1, 0, this.n - 1, ql, qr);
    }

    private _query(o: number, l: number, r: number, ql: number, qr: number): number {
        if (ql <= l && r <= qr) return this.mx[o];
        this.pushDown(o, l, r);
        const mid = (l + r) >> 1;
        let res = 0;
        if (ql <= mid) res = Math.max(res, this._query(o * 2, l, mid, ql, qr));
        if (qr > mid) res = Math.max(res, this._query(o * 2 + 1, mid + 1, r, ql, qr));
        return res;
    }
}

function getResults(queries: number[][]): boolean[] {
    // 线段树覆盖范围：所有出现过的 x 的最大值
    let maxX = 0;
    for (const q of queries) {
        maxX = Math.max(maxX, q[1]);
    }

    const seg = new SegTree(maxX + 1);
    const obstacles = new SortedList();
    obstacles.add(0); // 哨兵障碍物在 0，gap[i] = i - 0 = i

    const ans: boolean[] = [];
    for (const q of queries) {
        if (q[0] === 1) {
            const x = q[1];
            // 重复放置同一位置直接忽略（题目通常保证不重复，这里防御一下）
            if (obstacles.has(x)) continue;
            const nxt = obstacles.findHigher(x);
            // right 包含 nxt（下一个障碍物的 gap 也需更新为 nxt - x）
            const right = nxt === Infinity ? maxX : nxt;
            // [x+1, right] 的左侧最近障碍物变为 x（x 自身 gap 保持不变）
            seg.update(x + 1, right, x);
            obstacles.add(x);
        } else {
            const x = q[1];
            const sz = q[2];
            ans.push(seg.query(0, x) >= sz);
        }
    }
    return ans;
}
// @lc code=end

