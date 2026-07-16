/*
 * @lc app=leetcode.cn id=2144 lang=typescript
 *
 * [2144] 打折购买糖果的最小开销
 */

// @lc code=start
function quickSort(arr: number[], left: number, right: number): void {
    if (left >= right) {
        return;
    }

    const pivotIdx = Math.floor(Math.random() * (right - left + 1)) + left;
    const pivotVal = arr[pivotIdx];
    let lt = left, rt = right;
    let i = lt;

    while (i <= rt) {
        if (arr[i] > pivotVal) {
            const temp = arr[lt];
            arr[lt] = arr[i];
            arr[i] = temp;
            lt++;
            i++;
        } else if (arr[i] < pivotVal) {
            const temp = arr[rt];
            arr[rt] = arr[i];
            arr[i] = temp;
            rt--;
        } else {
            i++;
        }
    }

    quickSort(arr, left, lt - 1);
    quickSort(arr, rt + 1, right);
}

function minimumCost(cost: number[]): number {
    if (cost.length <= 2) {
        return cost.reduce((a, b) => a + b, 0);
    }
    // 排序
    quickSort(cost, 0, cost.length - 1);

    let res = 0;
    for (let i = 0; i < cost.length; i++) {
        if (i % 3 !== 2) {
            res += cost[i];
        }
    }

    return res;
};

minimumCost([1,2,3])
// @lc code=end

