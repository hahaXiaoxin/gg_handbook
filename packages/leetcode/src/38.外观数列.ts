/*
 * @lc app=leetcode.cn id=38 lang=typescript
 *
 * [38] 外观数列
 */

// @lc code=start
function countAndSay(n: number): string {
    return countAndSayByIteration(n);
};

/**
 * 迭代法解决外观数列
 */
function countAndSayByIteration(n: number): string {
    let result = '1';

    for (let i = 2; i <= n; i++) {
        let nums = 1;
        let nextResult = '';

        for (let j = 1; j < result.length; j++) {
            if (result[j] === result[j - 1]) {
                nums++;
                continue;
            }

            nextResult += `${nums}${result[j - 1]}`;
            nums = 1;
        }

        nextResult += `${nums}${result[result.length - 1]}`;
        result = nextResult;
    }

    return result;
}
// @lc code=end

