/**
 * 家具形状的某一个节点，其中记录了上下左右的节点的状态，hasUse表示当前节点是否已经放置
 */
interface IFurnitureNode {
    hasUse?: boolean;
    up?: IFurnitureNode;
    right?: IFurnitureNode;
    down?: IFurnitureNode;
    left?: IFurnitureNode;
}

interface IFurniture {
    name: string;
    startNode: IFurnitureNode;
}

export class PlaceFurniture {
    /**
     * home 房间的布局，home[i][j]表示房间下标为ij的空间是否被占用，0表示未被占用，1表示被占用
     */
    private home: number[][];

    /**
     * 家具的形状
     */
    private furnitures: IFurniture[];

    /**
     * 判定某个家具是否被使用了
     */
    private useMap: Map<IFurniture, boolean>;

    /**
     * 表示某个位置应该放置什么家具
     */
    private installMap: Map<`${number},${number}`, string> = new Map();

    constructor(home: number[][], furniture: IFurniture[]) {
        this.home = home;
        this.furnitures = furniture;

        this.useMap = new Map(furniture.map((i) => [i, false]));
    }

    /**
     * 获取第一个可用的起始点
     */
    private getStartPosi(): [number, number] | undefined {
        for (let i = 0; i < this.home.length; i++) {
            for (let j = 0; j < this.home[0].length; j++) {
                if (this.home[i][j] === 0) {
                    return [i, j];
                }
            }
        }

        return;
    }

    /**
     * 在某个节点放置家具
     */
    private InstallFurniture(node: IFurnitureNode, posi: [number, number]): boolean {
        const maxH = this.home.length;
        const maxW = this.home[0].length;
        const [i, j] = posi;

        // 如果越界直接不准放置
        if (i < 0 || i > maxH - 1 || j < 0 || j > maxW - 1) {
            return false;
        }

        // 当前位置已放置的情况下不准放置
        if (this.home[i][j]) {
            return false;
        }

        // 如果可以的话，那就将当前home的位置设置为1
        this.home[i][j] = 1;
        node.hasUse = true;

        const result = (() => {
            // 开始遍历节点的周边节点

            // 上方节点
            if (node.up?.hasUse === false && !this.InstallFurniture(node.up, [i - 1, j])) {
                return false;
            }

            // 右方节点
            if (node.right?.hasUse === false && !this.InstallFurniture(node.right, [i, j + 1])) {
                return false;
            }

            // 下方节点
            if (node.down?.hasUse === false && !this.InstallFurniture(node.down, [i + 1, j])) {
                return false;
            }

            // 左方节点
            if (node.left?.hasUse === false && !this.InstallFurniture(node.left, [i, j - 1])) {
                return false;
            }

            return true;
        })();

        // 如果result为false，则需要将对应的坐标和hasUse复原
        if (!result) {
            this.home[i][j] = 0;
            node.hasUse = false;    
        }

        return result
    }

    /**
     * 在某个节点卸载家具
     */
    private UninstallFurniture(node: IFurnitureNode, posi: [number, number]) {
        const [i, j] = posi;

        // 如果可以的话，那就将当前home的位置设置为0
        this.home[i][j] = 0;
        node.hasUse = false;

        // 卸载上方节点
        node.up?.hasUse === true && this.UninstallFurniture(node.up, [i - 1, j])

        // 卸载右方节点
        node.right?.hasUse === true && this.UninstallFurniture(node.right, [i, j + 1])

        // 卸载下方节点
        node.down?.hasUse === true && this.UninstallFurniture(node.down, [i + 1, j])

        // 卸载左方节点
        node.left?.hasUse === true && this.UninstallFurniture(node.left, [i, j - 1])
    }

    /**
     * 从当前节点开始遍历
     */
    private dfs(i: number, j: number): false {
        // 家具可能有一样的形状的，记录某个形状是否在此处可以使用
        const nameSet = new Set();

        // 如果没有家具了，则直接跳出，说明已经摆完了
        const filterUnUseList = this.furnitures.filter(i => !this.useMap.get(i));

        if (!filterUnUseList.length) {
            throw true;
        }

        for (let x = 0; x < filterUnUseList.length; x++) {
            const furniture = filterUnUseList[x];

            // 如果当前家具的形状已经尝试过了不可行就跳过
            if (nameSet.has(furniture.name)) {
                continue;
            }

            // 判断当前家具是否可以放置
            const result = this.InstallFurniture(furniture.startNode, [i, j]);
            // 不管如何，此处已经不能再放置同样类型的家具
            nameSet.add(furniture.name);

            // 如果可以放置的话
            if (result) {
                // 设置当前家具已经被使用
                this.useMap.set(furniture, true);

                // 将当前答案放置res之中
                this.installMap.set(`${i},${j}`, furniture.name);

                // 获取下一个可以放置的点位
                const nextPosi = this.getStartPosi();
                
                // 如果nextPosi不存在，说明已经放置完毕了，直接跳出递归
                if (!nextPosi) {
                    throw true;
                }

                const nextRes = this.dfs(nextPosi[0], nextPosi[1]);

                // 如果放置不了则需要卸载家具
                if (!nextRes) {
                    this.UninstallFurniture(furniture.startNode, [i, j]);
                    this.useMap.set(furniture, false);
                    this.installMap.delete(`${i},${j}`);
                }
            }
            
        }

        return false
    }

    public run() {

        try {
            this.dfs(...this.getStartPosi()!)
        } catch {
            return this.installMap;
        }
    }
}

function getShape1(): IFurniture {
    return {
        name: 'shape1',
        startNode: {
            hasUse: false,
            down: {
                hasUse: false,
                down: {
                    hasUse: false,
                    down: {
                        hasUse: false
                    }
                }
            }
        }
    }
}

function getShape2(): IFurniture {
    return {
        name: 'shape2',
        startNode: {
            hasUse: false,
            right: {
                hasUse: false,
                right: {
                    hasUse: false,
                    right: {
                        hasUse: false
                    }
                }
            }
        }
    }
}

function getShape3(): IFurniture {
    return {
        name: 'shape3',
        startNode: {
            hasUse: false,
            right: {
                hasUse: false,
                down: {
                    hasUse: false,
                }
            }
        }
    }
}

function getShape4(): IFurniture {
    return {
        name: 'shape4',
        startNode: {
            hasUse: false,
            right: {
                hasUse: false,
                right: {
                    hasUse: false,
                }
            }
        }
    }
}

function getShape5(): IFurniture {
    return {
        name: 'shape5',
        startNode: {
            hasUse: false,
            down: {
                hasUse: false,
                down: {
                    hasUse: false,
                    right: {
                        hasUse: false
                    }
                }
            }
        }
    }
}

function getShape6(): IFurniture {
    return {
        name: 'shape6',
        startNode: {
            hasUse: false,
            down: {
                hasUse: false,
                left: {
                    hasUse: false,
                    left: {
                        hasUse: false
                    }
                }
            }
        }
    }
}

function getShape7(): IFurniture {
    return {
        name: 'shape7',
        startNode: {
            hasUse: false,
            down: {
                hasUse: false,
                down: {
                    hasUse: false,
                    left: {
                        hasUse: false
                    }
                }
            }
        }
    }
}

function getShape8(): IFurniture {
    return {
        name: 'shape8',
        startNode: {
            hasUse: false,
            down: {
                hasUse: false,
                right: {
                    hasUse: false,
                }
            }
        }
    }
}

const home = [
    [0,0,0,0,0,0],
    [0,0,0,1,1,0],
    [0,1,0,1,0,0],
    [0,1,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,1,1,0],
    [0,0,0,0,0,0]
]

const furnitures = [
    getShape1(),
    getShape2(),
    getShape3(),
    getShape3(),
    getShape4(),
    getShape5(),
    getShape6(),
    getShape7(),
    getShape8(),
    getShape8(),
]

const instance = new PlaceFurniture(home, furnitures);

const res = instance.run();

console.log(res);