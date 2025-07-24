import { TreeNode } from "./TreeNode";

export enum OperationType {
    CREATE,
    DELETE,
    MODIFY,
    MOVE,
}

/**
 * 用于描述一个操作节点
 */
export interface OperationNode {
    /**
     * 节点类型
     */
    type: OperationType;

    /**
     * 前一个操作节点
     */
    previous: OperationNode | null;

    /**
     * 下一个操作节点
     */
    next: OperationNode | null;

    /**
     * 执行时做出的操作
     */
    excute(): void;

    /**
     * 回退时做出的操作
     */
    revert(): void;
}

export abstract class OperationNodeBase implements OperationNode {
    private _previous: OperationNode | null = null;

    private _next: OperationNode | null = null;

    constructor(previous: OperationNode | null, next: OperationNode | null) {
        this._previous = previous;
        this._next = next;
    }

    public get previous(): OperationNode | null {
        return this._previous;
    }

    public get next(): OperationNode | null {
        return this._next;
    }

    public set next(value: OperationNode | null) {
        this._next = value;
    }

    public abstract type: OperationType;

    public abstract excute(): void;

    public abstract revert(): void;
}

/**
 * 记录创建操作
 */
export class CreateNode extends OperationNodeBase {
    public type = OperationType.CREATE;

    /**
     * 记录插入的节点
     */
    private _insertNodeId: number;

    /**
     * 记录父节点id
     */
    private _parentNodeId: number;

    /**
     * 在父节点的第几个位置插入了节点
     */
    private _index: number;

    public constructor(options: {
        parentNodeId: number;
        index: number;
        insertNodeId: number;
        previous: OperationNode | null;
        next: OperationNode | null;
    }) {
        super(options.previous, options.next);
        this._parentNodeId = options.parentNodeId;
        this._index = options.index;
        this._insertNodeId = options.insertNodeId;
    }

    /**
     * 执行时只需要将对应的节点插入即可
     */
    public excute() {
        const parentNode = TreeNode.treeNodeMap.get(this._parentNodeId)!;

        const insertNode = TreeNode.treeNodeMap.get(this._insertNodeId)!;

        parentNode?.addChild(insertNode, this._index);
    }

    /**
     * 回退时只需要将对应的节点删除即可
     */
    public revert() {
        const parentNode = TreeNode.treeNodeMap.get(this._parentNodeId)!;

        parentNode?.removeChild(this._index);
    }

    public get parentNodeId(): number {
        return this._parentNodeId;
    }

    public get index(): number {
        return this._index;
    }
}

/**
 * 记录删除操作
 */
export class DeleteNode extends OperationNodeBase {
    public type = OperationType.DELETE;

    /**
     * 记录父节点id
     */
    private _parentNodeId: number;

    /**
     * 删除了父节点第几个位置的节点
     */
    private _index: number;

    /**
     * 删除的节点id
     */
    private _deleteNodeId: number | undefined;

    public constructor(options: { parentNodeId: number; index: number; previous: OperationNode | null; next: OperationNode | null }) {
        super(options.previous, options.next);
        this._parentNodeId = options.parentNodeId;
        this._index = options.index;
    }

    /**
     * 删除时只需要记录对应id然后删除即可
     */
    public excute() {
        const parentNode = TreeNode.treeNodeMap.get(this._parentNodeId)!;

        this._deleteNodeId = parentNode.children[this._index].id;

        parentNode.removeChild(this._index);
    }

    /**
     * 回退时只需要将对应的节点插入即可
     */
    public revert() {
        if (!this._deleteNodeId) {
            throw new Error("Run revert before excute");
        }

        const parentNode = TreeNode.treeNodeMap.get(this._parentNodeId)!;

        const insertNode = TreeNode.treeNodeMap.get(this._deleteNodeId)!;

        parentNode.addChild(insertNode, this._index);
    }

    public get parentNodeId(): number {
        return this._parentNodeId;
    }

    public get index(): number {
        return this._index;
    }
}

/**
 * 记录修改操作
 */
export class ModifyNode extends OperationNodeBase {
    public type = OperationType.MODIFY;

    /**
     * 记录修改节点id
     */
    private _modifyNodeId: number;

    /**
     * 记录修改前的内容
     */
    private _originContent: string = "";

    /**
     * 记录修改后的内容
     */
    private _newContent: string = "";

    public constructor(options: { modifyNodeId: number; newContent: string; previous: OperationNode | null; next: OperationNode | null }) {
        super(options.previous, options.next);
        this._modifyNodeId = options.modifyNodeId;
        this._newContent = options.newContent;
    }

    /**
     * 修改时需要记录原本的数据
     */
    public excute() {
        const modifyNode = TreeNode.treeNodeMap.get(this._modifyNodeId)!;

        this._originContent = modifyNode.content;

        modifyNode.updateContent(this._newContent);
    }

    /**
     * 回退时只需要将对应的节点插入即可
     */
    public revert() {
        const modifyNode = TreeNode.treeNodeMap.get(this._modifyNodeId)!;

        modifyNode.updateContent(this._originContent);
    }
}

/**
 * 记录节点的移动
 */
export class MoveNode extends OperationNodeBase {
    public type = OperationType.MOVE;

    /**
     * 记录移动的节点id
     */
    private _fromNodeId: number;

    /**
     * 记录移动的节点在父节点的第几个位置
     */
    private _fromIndex: number;

    /**
     * 记录移动到的节点id
     */
    private _toNodeId: number;

    /**
     * 记录移动到的节点在父节点的第几个位置
     */
    private _toIndex: number;

    public constructor(options: {
        fromNodeId: number;
        fromIndex: number;
        toNodeId: number;
        toIndex: number;
        previous: OperationNode | null;
        next: OperationNode | null;
    }) {
        super(options.previous, options.next);
        this._fromNodeId = options.fromNodeId;
        this._fromIndex = options.fromIndex;
        this._toNodeId = options.toNodeId;
        this._toIndex = options.toIndex;
    }

    public excute() {
        const fromNode = TreeNode.treeNodeMap.get(this._fromNodeId)!;

        const toNode = TreeNode.treeNodeMap.get(this._toNodeId)!;

        fromNode.removeChild(this._fromIndex);

        toNode.addChild(fromNode, this._toIndex);
    }

    public revert() {
        const fromNode = TreeNode.treeNodeMap.get(this._fromNodeId)!;

        const toNode = TreeNode.treeNodeMap.get(this._toNodeId)!;

        toNode.removeChild(this._toIndex);

        fromNode.addChild(toNode, this._fromIndex);
    }
}
