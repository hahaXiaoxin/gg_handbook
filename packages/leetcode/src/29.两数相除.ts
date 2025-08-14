/*
 * @lc app=leetcode.cn id=29 lang=typescript
 *
 * [29] 两数相除
 */

// @lc code=start

const MAX_INT = 2147483647;
const MIN_INT = -2147483648;

function divide(dividend: number, divisor: number): number {
    const flag = dividend < 0 && divisor < 0 || dividend >= 0 && divisor >= 0;

    const dividendArr = Math.abs(dividend).toString().split('');

    const divisorAbs = Math.abs(divisor);

    let result = 0;

    let minusend = 0;

    while (dividendArr.length > 0) {
        minusend = Number(minusend.toString() + dividendArr.shift());

        let count = 0;

        while (minusend >= divisorAbs) {
            minusend -= divisorAbs;
            count++;
        }

        result = result * 10 + count;

        const tempResult = flag ? result : -result;
        if (tempResult > MAX_INT) {
            return MAX_INT;
        }

        if (tempResult < MIN_INT) {
            return MIN_INT;
        }
    }

    result = flag ? result : -result;

    return result;
};
// @lc code=end

