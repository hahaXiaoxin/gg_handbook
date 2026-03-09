/**
 * 查找出现两次的元素
 */
function getTwiceNums(a: number[]): number[] {
    const set = new Set();

    const res = [];

    for (let i = 0; i < a.length; i++) {
        if (set.has(a[i])) {
            res.push(a[i]);
            continue;
        }

        set.add(a[i]);
    }

    return res;
}

console.log(getTwiceNums([1,1,2,3,4,5,6,6]))

