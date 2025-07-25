/*
 * @lc app=leetcode.cn id=32 lang=typescript
 *
 * [32] 最长有效括号
 */

// @lc code=start
function longestValidParentheses(s: string): number {
    return wayOfDP(s);
};

function wayOfStack(s: string): number {
    let maxLength = 0;
    const stack = [-1]; // 初始放入-1作为哨兵，方便计算长度
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i); // 左括号入栈
        } else {
            stack.pop(); // 右括号，弹出栈顶
            
            if (stack.length === 0) {
                // 栈为空说明没有匹配的左括号，把当前右括号索引入栈作为新的起始点
                stack.push(i);
            } else {
                // 计算当前有效括号长度
                maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
            }
        }
    }
    
    return maxLength;
}

function wayOfDP(s: string): number {
    const dp = new Array(s.length).fill(0);
    let maxLength = 0;
    
    for (let i = 1; i < s.length; i++) {
        if (s[i] === ')') {
            if (s[i - 1] === '(') {
                // 形如 "...()"
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
            } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
                // 形如 "...())"，看是否能跨过内部的有效括号匹配
                dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] >= 2 ? dp[i - dp[i - 1] - 2] : 0);
            }
            maxLength = Math.max(maxLength, dp[i]);
        }
    }
    
    return maxLength;
}
// @lc code=end

