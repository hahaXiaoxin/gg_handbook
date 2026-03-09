/*
 * @lc app=leetcode.cn id=126 lang=typescript
 *
 * [126] 单词接龙 II
 */

// @lc code=start
const A_ASCII = 97;

function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
    // wordList 单词集合
    const wordSet = new Set(wordList);
    const parentMap = new Map<string, Set<string>>();
    const queue = [beginWord];
    const res: string[][] = [];
    const visitedSet = new Set<string>();
    let loop = 1;

    if (!wordSet.has(endWord)) return res;

    while(queue.length) {
        loop++;
        const size = queue.length;
        let found = false;

        for (let i = 0; i < size; i++) {
            const currentWord = queue.shift()!;

            if (visitedSet.has(currentWord)) continue;

            visitedSet.add(currentWord);

            findNextWord: for (let j = 0; j < currentWord.length; j++) {
                for (let k = 0; k < 26; k++) {
                    const newWord = currentWord.slice(0, j) + String.fromCharCode(A_ASCII + k) + currentWord.slice(j + 1);

                    // 如果这个相邻单词不存在或者已经访问过了就调过
                    if (!wordSet.has(newWord) || visitedSet.has(newWord)) continue;

                    if (!parentMap.has(newWord)) {
                        parentMap.set(newWord, new Set<string>());
                    }

                    const parentSet = parentMap.get(newWord)!;
                    parentSet.add(currentWord);

                    if (newWord === endWord) {
                        found = true;
                        break findNextWord;
                    }

                    queue.push(newWord);
                }
            }
        }

        // 如果当前这轮已经找到了，说明已经没有更短的路径了，BFS 的优势
        if (found) break;
    }
    
    // 从终点逆向回推
    function dfsFindLink(currentWord: string, reversePath: string[]) {
        reversePath.push(currentWord);
        // 超出最短长度之后就直接终止 dfs
        if (reversePath.length > loop) {
            reversePath.pop();
            return;
        }

        // 如果找到了就直接添加到结果之中
        if (currentWord === beginWord) {
            res.push(reversePath.slice().reverse());
            reversePath.pop();
            return;
        }

        const parentSet = parentMap.get(currentWord);
        if (!parentSet) {
            reversePath.pop();
            return;
        }

        for (const parentWord of parentSet) {
            dfsFindLink(parentWord, reversePath);
        }

        reversePath.pop();
    }

    dfsFindLink(endWord, []);

    return res;
};
// @lc code=end

