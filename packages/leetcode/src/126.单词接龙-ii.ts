/*
 * @lc app=leetcode.cn id=126 lang=typescript
 *
 * [126] 单词接龙 II
 */

// @lc code=start
const A_ASCII_CODE = 'a'.charCodeAt(0);
/**
 * 思路：BFS + DFS
 * 1. 先用 BFS 从 beginWord 开始层序遍历，记录每个单词的最短距离和父节点关系
 * 2. 再用 DFS 从 endWord 回溯，根据父节点关系收集所有最短路径
 * 
 * 优化点：
 * - BFS 保证找到的是最短路径
 * - 用距离映射避免重复访问，同时支持多路径
 * - DFS 反向回溯，只走最短路径上的边
 */
function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
    const wordSet = new Set(wordList);
    const res: string[][] = [];
    
    // endWord 不在词表中，直接返回空
    if (!wordSet.has(endWord)) return res;
    
    // BFS 相关数据结构
    const distanceMap: Map<string, number> = new Map(); // 每个单词到 beginWord 的最短距离
    const parentMap: Map<string, Set<string>> = new Map(); // 每个单词的父节点集合（可能多个）
    
    // BFS 初始化
    distanceMap.set(beginWord, 0);
    const queue: string[] = [beginWord];
    let found = false;
    
    // BFS 层序遍历建图
    while (queue.length > 0 && !found) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const currentWord = queue.shift()!;
            const currentDist = distanceMap.get(currentWord)!;

            // 生成所有可能的下一个单词
            findNextWord: for (let j = 0; j < currentWord.length; j++) {
                for (let k = 0; k < 26; k++) {
                    const newWord = currentWord.slice(0, j) + String.fromCharCode(A_ASCII_CODE + k) + currentWord.slice(j + 1);

                    if (!wordSet.has(newWord)) continue;

                    // 如果新单词未访问过，记录距离并加入队列
                    if (!distanceMap.has(newWord)) {
                        distanceMap.set(newWord, currentDist + 1);
                        queue.push(newWord);
                    }

                    // 如果新单词是当前层的（距离相同），说明是另一条最短路径
                    if (distanceMap.get(newWord) === currentDist + 1) {
                        if (!parentMap.has(newWord)) {
                            parentMap.set(newWord, new Set());
                        }
                        parentMap.get(newWord)!.add(currentWord);
                    }

                    // 找到目标单词，标记但不立即返回
                    // 当前 currentWord 的其他变换可以跳过（都是同距离，不会更优）
                    // 但同层其他 currentWord 仍需处理（可能有不同路径）
                    if (newWord === endWord) {
                        found = true;
                        break findNextWord; // 跳出 k 循环
                    }
                }
            }
        }
    }
    
    // 如果没找到，返回空
    if (!found) return res;
    
    // DFS 从 endWord 回溯收集所有路径
    function dfs(word: string, path: string[]) {
        path.push(word);
        
        // 回溯到 beginWord，收集路径
        if (word === beginWord) {
            res.push(Array.from(path).reverse());
            path.pop();
            return;
        }
        
        // 遍历所有父节点
        const parents = parentMap.get(word);
        if (parents) {
            for (const parent of parents) {
                dfs(parent, path);
            }
        }
        
        path.pop();
    }
    
    dfs(endWord, []);
    
    return res;
};
// @lc code=end

console.log(findLadders('hit', 'cog', ["hot","dot","dog","lot","log","cog"]));
