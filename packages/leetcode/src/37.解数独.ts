/*
 * @lc app=leetcode.cn id=37 lang=typescript
 *
 * [37] 解数独
 */

// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
    retrospection(board);
};

function retrospection(board: string[][]) {
    // 首先用三个二位数组记录每一行、每一列、每个3x3方格中已经使用的数字
    const rows: boolean[][] = Array.from({ length: 9 }, () => Array(10).fill(false));
    const cols: boolean[][] = Array.from({ length: 9 }, () => Array(10).fill(false));
    const boxes: boolean[][] = Array.from({ length: 9 }, () => Array(10).fill(false));

    // 收集所有空格位置
    const emptyCells: [number, number][] = [];

    // 初始化
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell !== '.') {
                const num = parseInt(cell);
                const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

                rows[i][num] = true;
                cols[j][num] = true;
                boxes[boxIndex][num] = true;
            } else {
                emptyCells.push([i, j]);
            }
        })
    })

    // 计算某个位置可以填入的数字个数
    const countPossibleNumbers = (row: number, col: number): number => {
        const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        let count = 0;

        for (let num = 1; num <= 9; num++) {
            if (!rows[row][num] && !cols[col][num] && !boxes[boxIndex][num]) {
                count++;
            }
        }

        return count;
    }

    // 选择约束最多的位置（也就是得到的count最小）
    const getNextPosition = (): [number, number] | null => {
        let minPossibilities = 10;
        let result: [number, number] | null = null;

        for (const [row, col] of emptyCells) {
            if (board[row][col] !== '.') {
                continue;
            }

            const count = countPossibleNumbers(row, col);

            if (count < minPossibilities) {
                minPossibilities = count;
                result = [row, col];

                if (minPossibilities === 1) {
                    return result;
                }
            }
        }

        return result;
    }

    // 回溯函数
    const solve = (): boolean => {
        const position = getNextPosition();

        if (!position) {
            return true;
        }

        const [row, col] = position;
        const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);

        for (let num = 1; num <= 9; num++) {
            if (!rows[row][num] && !cols[col][num] && !boxes[boxIndex][num]) {
                board[row][col] = num.toString();
                rows[row][num] = true;
                cols[col][num] = true;
                boxes[boxIndex][num] = true;


                if (solve()) {
                    return true;
                }

                board[row][col] = '.';
                rows[row][num] = false;
                cols[col][num] = false;
                boxes[boxIndex][num] = false;
            }
        }

        return false;
    }

    solve();
}
// @lc code=end

