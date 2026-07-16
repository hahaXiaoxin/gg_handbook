/*
 * @lc app=leetcode.cn id=2126 lang=typescript
 *
 * [2126] 摧毁小行星
 */

// @lc code=start
// 原地三路快速排序（避免重复元素导致的 O(n^2) 退化）
function quickSort(arr: number[], left: number = 0, right: number = arr.length - 1): void {
    if (left >= right) {
        return;
    }

    // 随机选取基准，避免有序数组退化
    const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
    let tmp = arr[randomIndex];
    arr[randomIndex] = arr[left];
    arr[left] = tmp;
    const pivot = arr[left];

    // 三路划分：[left, lt) < pivot，[lt, i) == pivot，(gt, right] > pivot
    let lt = left;
    let gt = right;
    let i = left + 1;
    while (i <= gt) {
        if (arr[i] < pivot) {
            tmp = arr[i];
            arr[i] = arr[lt];
            arr[lt] = tmp;
            lt++;
            i++;
        } else if (arr[i] > pivot) {
            tmp = arr[i];
            arr[i] = arr[gt];
            arr[gt] = tmp;
            gt--;
        } else {
            i++;
        }
    }

    quickSort(arr, left, lt - 1);
    quickSort(arr, gt + 1, right);
}

function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
    // 先进行排序，这里练习一下快排
    quickSort(asteroids);

    let sum = mass;

    for (let i = 0; i < asteroids.length; i++) {
        if (sum < asteroids[i]) {
            return false;
        }
        sum += asteroids[i];
    }

    return true;
};
// @lc code=end

