/*
 * @lc app=leetcode.cn id=202 lang=typescript
 *
 * [202] 快乐数
 */

// @lc code=start
function isHappy(n: number): boolean {
    /**
     * 记录是否产生循环
     */
    // return dfs(n);

    return circle(n);
};

/**
 * 递归计算快乐数
 * @param n 
 * @param set 
 * @returns 
 */
function dfs(n: number, set: Set<number> = new Set()) {
    let result = 0;

    while (n > 0) {
        // 取最后一位数
        const digit = n % 10;

        // 同时将n减小一位
        n = Math.floor(n / 10);

        result += digit ** 2;
    }

    if (result === 1) {
        return true;
    }

    if (set.has(result)) {
        return false;
    }

    set.add(result);

    return dfs(result, set);
}

function circle(n: number) {
    const set = new Set();

    while (n !== 1) {
        let result = 0;

        while (n > 0) {
            const digit = n % 10;
            n = Math.floor(n / 10);

            result += digit ** 2;
        }

        if (set.has(result)) {
            return false;
        }

        set.add(result);

        n = result;
    }

    return true;
}
// @lc code=end

