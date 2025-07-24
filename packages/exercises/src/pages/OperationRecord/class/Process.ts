import { CreateNode, DeleteNode, ModifyNode, MoveNode, OperationNodeBase } from "./OperationNode";
import { TreeNode } from "./TreeNode";

/**
 * 表示一个进程，记录整个过程
 */
export class Process {
    /**
     * 当前所在节点
     */
    private _currentNode: OperationNodeBase | null = null;

    constructor(
        public rootNode: TreeNode,
        public onChange?: () => void,
    ) {}

    /**
     * 创建节点
     */
    public createNode(options: { parentNodeId: number; index: number }) {
        const newTreeNode = options.parentNodeId === -1 ? this.rootNode : new TreeNode();

        const nextNode = new CreateNode({
            parentNodeId: options.parentNodeId,
            insertNodeId: newTreeNode.id,
            index: options.index,
            previous: this._currentNode,
            next: null,
        });

        this._currentNode = (this._currentNode || { next: null }).next = nextNode;

        nextNode.excute();

        this.onChange?.();
    }

    /**
     * 删除节点
     */
    public deleteNode(options: { parentNodeId: number; index: number }) {
        const nextNode = new DeleteNode({
            parentNodeId: options.parentNodeId,
            index: options.index,
            previous: this._currentNode,
            next: null,
        });

        this._currentNode = (this._currentNode || { next: null }).next = nextNode;

        nextNode.excute();

        this.onChange?.();
    }

    /**
     * 修改节点
     */
    public modifyNode(options: { nodeId: number; newContent: string }) {
        const nextNode = new ModifyNode({
            modifyNodeId: options.nodeId,
            newContent: options.newContent,
            previous: this._currentNode,
            next: null,
        });

        this._currentNode = (this._currentNode || { next: null }).next = nextNode;

        nextNode.excute();

        this.onChange?.();
    }

    /**
     * 移动节点
     */
    public moveNode(options: { fromNodeId: number; fromIndex: number; toNodeId: number; toIndex: number }) {
        const nextNode = new MoveNode({
            fromNodeId: options.fromNodeId,
            fromIndex: options.fromIndex,
            toNodeId: options.toNodeId,
            toIndex: options.toIndex,
            previous: this._currentNode,
            next: null,
        });

        this._currentNode = (this._currentNode || { next: null }).next = nextNode;

        nextNode.excute();

        this.onChange?.();
    }

    /**
     * 撤销一步
     */
    public revert() {
        this._currentNode?.revert();

        this._currentNode = (this._currentNode?.previous as OperationNodeBase) || null;

        this.onChange?.();
    }

    /**
     * 前进一步
     */
    public forward() {
        this._currentNode = (this._currentNode?.next as OperationNodeBase) || null;

        if (this._currentNode) {
            this._currentNode.excute();
            this.onChange?.();
        }
    }

    public hasNext() {
        return Boolean(this._currentNode?.next);
    }

    public hasPrevious() {
        return Boolean(this._currentNode?.previous);
    }
}
