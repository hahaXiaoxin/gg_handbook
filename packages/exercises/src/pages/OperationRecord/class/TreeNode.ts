/**
 * 用于描述一个树节点
 */
export class TreeNode {
    public static treeNodeMap: Map<number, TreeNode> = new Map();

    public static key: number = 0;

    public static resetMap() {
        TreeNode.treeNodeMap = new Map();
        TreeNode.key = 0;
    }

    public id: number;

    private _children: TreeNode[] = [];

    private _parent: TreeNode | null = null;

    private _content: string = '';

    public constructor(content?: string) {
        this.id = TreeNode.key++;
        TreeNode.treeNodeMap.set(this.id, this);
        this._content = content ?? '';
    }

    /**
     * 添加一个子节点
     * @param child 子节点
     * @param index 子节点在父节点中的位置
     */
    public addChild(child: TreeNode, index: number) {
        this._children.splice(index, 0, child);
        child.parent = this;
    }

    /**
     * 移除一个子节点
     * @param index 子节点在父节点中的位置
     */
    public removeChild(index: number) {
        this._children[index].parent = null;
        this._children.splice(index, 1);
    }

    /**
     * 更新内容
     */
    public updateContent(content: string) {
        this._content = content;
    }

    public get parent(): TreeNode | null {
        return this._parent;
    }

    public set parent(value: TreeNode | null) {
        this._parent = value;
    }

    public get children(): TreeNode[] {
        return this._children;
    }

    public get content(): string {
        return this._content;
    }
}