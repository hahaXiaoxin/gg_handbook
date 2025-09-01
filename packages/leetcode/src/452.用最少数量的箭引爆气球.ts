/*
 * @lc app=leetcode.cn id=452 lang=typescript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
function useGreed(points: number[][]): number {
    const sortedPoints = Array.from(points).sort((a, b) => a[0] - b[0]);

    if (points.length === 1) {
        return 1;
    }

    // right 是当前能射到最多个气球的最右边的位置
    let res = 0, right = sortedPoints[0][1];

    for (let i = 1; i < sortedPoints.length; i++) {
        // 如果当前气球的最左侧已经超过了right，说明一箭无法射到当前气球，就必须把之前的射了
        if (right < sortedPoints[i][0]) {
            right = sortedPoints[i][1];
            res++;
            continue;
        }

        // 多个气球重叠，取从右往左数，右边界最内部的气球
        if (right > sortedPoints[i][1]) {
            right = sortedPoints[i][1];
            continue;
        }
    }

    // 最后别忘了还要射出一箭，因为循环只是找到了性价比最高的位置
    res++;

    return res;
}

function findMinArrowShots(points: number[][]): number {
    return useGreed(points);
};
// @lc code=end

