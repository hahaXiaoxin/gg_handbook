/*
 * @lc app=leetcode.cn id=127 lang=typescript
 *
 * [127] 单词接龙
 */

// @lc code=start
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    // 构建字符串set
    const wordSet = new Set(wordList);

    if (!wordSet.has(endWord)) {
        return 0;
    }

    const queue: (string | null)[] = [beginWord, null];
    const visited = new Set<string>([]);
    let steps = 1;

    // 细节：队列中永远有一个分层标记，所以需要大于1
    while (queue.length > 1) {
        const currentWord = queue.shift();
        if(currentWord === endWord) {
            return steps;
        }
        
        // 读到分层标记则步数加一
        if (!currentWord) {
            steps++;
            // 同时注意要给队尾添加分层标记
            queue.push(null);
            continue;
        }

        if (visited.has(currentWord)) {
            continue;
        }

        visited.add(currentWord);

        for (let i = 0; i < currentWord.length; i++) {
            for (let j = 0; j < 26; j++) {
                const newWord = currentWord.slice(0, i) + String.fromCharCode('a'.charCodeAt(0) + j) + currentWord.slice(i + 1);

                // 遇到相邻的单词则入列
                if (wordSet.has(newWord)) {
                    queue.push(newWord);
                }
            }
        }
    }

    return 0;
};
// @lc code=end

