/*
 * @lc app=leetcode.cn id=40 lang=typescript
 *
 * [40] 组合总和 II
 */

// @lc code=start
function combinationSum2(candidates: number[], target: number): number[][] {
    // 先对数组排序，便于后续剪枝和去重
    candidates.sort((a, b) => a - b);
    const result: number[][] = [];
    
    // 回溯算法
    function backtrack(start: number, target: number, path: number[]) {
        // 找到一个符合的组合
        if (target === 0) {
            result.push([...path]);
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            // 剪枝：当前数字大于目标值，后面的更大，无需继续
            if (candidates[i] > target) break;
            
            // 去重：同一层级中，相同数字只使用一次
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            
            path.push(candidates[i]);
            // 递归到下一层，注意索引是i+1因为每个数字只能用一次
            backtrack(i + 1, target - candidates[i], path);
            path.pop(); // 回溯，移除最后添加的元素
        }
    }
    
    backtrack(0, target, []);
    return result;
};
// @lc code=end

