import React, { useCallback, useEffect, useRef, useState } from "react";
import { TreeNode } from "./class/TreeNode";
import { Process } from "./class/Process";
import { TreeProps, TreeDataNode, Tree, Input, Space, Button } from "antd";

function translateTreeNodeToTreeData(node?: TreeNode): TreeDataNode | undefined {
    if (!node) {
        return undefined;
    }

    return {
        key: node.id,
        title: node.content,
        children: node.children.map(translateTreeNodeToTreeData).filter((child) => child !== undefined),
        isLeaf: node.children.length === 0,
    };
}

function getFromIndex(nodeId: number): number {
    const node = TreeNode.treeNodeMap.get(nodeId)!;

    const parent = node.parent;

    return parent?.children.findIndex((child) => child.id === nodeId) ?? -1;
}

const CustomTitle: React.FC<{
    node: TreeDataNode;
    onModify: (options: { nodeId: number; newContent: string }) => void;
    onCreate: (options: { parentNodeId: number; index: number }) => void;
    onDelete: (options: { parentNodeId: number; index: number }) => void;
}> = ({ node, onModify, onCreate, onDelete }) => {
    const [focused, setFocused] = useState(false);

    const parentNode = TreeNode.treeNodeMap.get(node.key as number)!.parent;

    return (
        <div onClick={() => setFocused(true)}>
            {focused ? (
                <Input
                    defaultValue={node.title as string}
                    onBlur={(e) => {
                        onModify({
                            nodeId: node.key as number,
                            newContent: e.target.value,
                        });
                        setFocused(false);
                    }}
                    style={{ maxWidth: 300 }}
                />
            ) : (
                <span>{node.title as React.ReactNode}</span>
            )}

            <Space style={{ marginLeft: 30 }}>
                <Button
                    onClick={(event) => {
                        event.stopPropagation();

                        const treeNode = TreeNode.treeNodeMap.get(node.key as number)!;

                        onCreate({
                            parentNodeId: treeNode!.id,
                            index: treeNode.children.length,
                        });
                    }}
                    type="primary"
                    size="small"
                >
                    添加子项
                </Button>

                <Button
                    onClick={(event) => {
                        event.stopPropagation();

                        const parentNodeId = parentNode!.id;

                        onCreate({
                            parentNodeId,
                            index: getFromIndex(node.key as number) + 1,
                        });
                    }}
                    type="primary"
                    size="small"
                    disabled={!parentNode}
                >
                    在此之后添加
                </Button>

                <Button
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete({
                            parentNodeId: parentNode!.id,
                            index: getFromIndex(node.key as number),
                        });
                    }}
                    type="primary"
                    danger
                    size="small"
                    disabled={!parentNode}
                >
                    删除
                </Button>
            </Space>
        </div>
    );
};

const OperationRecord: React.FC = () => {
    const [, setFlag] = useState({});

    const forceRender = useCallback(() => {
        setFlag({});
    }, []);

    // 创建一个树节点
    const rootNodeRef = useRef<TreeNode>();

    // 将转换树节点为Tree可识别的类型
    const treeData = translateTreeNodeToTreeData(rootNodeRef.current);

    // 创建一个进程
    const processRef = useRef<Process>();

    const handleCreateNode = useCallback((options: { parentNodeId: number; index: number }) => {
        processRef.current?.createNode(options);
    }, []);

    const handleDeleteNode = useCallback((options: { parentNodeId: number; index: number }) => {
        processRef.current?.deleteNode(options);
    }, []);

    const handleModifyNode = useCallback((options: { nodeId: number; newContent: string }) => {
        processRef.current?.modifyNode(options);
    }, []);

    useEffect(() => {
        TreeNode.resetMap();
        rootNodeRef.current = new TreeNode("root");
        processRef.current = new Process(rootNodeRef.current, forceRender);

        // 初始化执行一步创建的
        handleCreateNode({
            parentNodeId: -1,
            index: 0,
        });

        forceRender();
    }, []);

    const onDrop = useCallback<NonNullable<TreeProps["onDrop"]>>((info) => {
        // 被移动的节点
        const dragNodeId = info.dragNode.key as number;

        // 被移动的节点的父节点
        const fromNode = TreeNode.treeNodeMap.get(dragNodeId)!.parent!;

        // 前一个节点
        const frontNodeId = info.node.key;

        // 插入的位置
        const insertIndex = info.dropPosition;

        // 如果插入的位置是-1，说明插入到根节点前面了（本案例中不允许）
        if (insertIndex === -1) {
            return;
        }

        // 如果插入的位置是1且前一个节点时根节点，说明插入到根节点后面作为兄弟节点了（本案例中不允许）
        if (insertIndex === 1 && frontNodeId === rootNodeRef.current!.id) {
            return;
        }

        // 如果插入的位置是0，则frontNodeId就是父节点
        if (insertIndex === 0) {
            processRef.current?.moveNode({
                fromNodeId: fromNode.id,
                fromIndex: getFromIndex(dragNodeId),
                toNodeId: frontNodeId as number,
                toIndex: insertIndex,
            });
            return;
        }

        // 如果插入的位置不是0，则frontNodeId就是父节点
        if (insertIndex !== 0) {
            const frontNode = TreeNode.treeNodeMap.get(frontNodeId as number)!;

            const toNodeId = frontNode.parent!.id;

            processRef.current?.moveNode({
                fromNodeId: fromNode.id,
                fromIndex: getFromIndex(dragNodeId),
                toNodeId: toNodeId,
                toIndex: insertIndex,
            });
            return;
        }
    }, []);

    return (
        <div>
            <Space>
                <Button
                    onClick={() => processRef.current?.forward()}
                    disabled={!processRef.current?.hasNext()}
                    type="primary"
                >
                    前进
                </Button>
                <Button
                    onClick={() => processRef.current?.revert()}
                    disabled={!processRef.current?.hasPrevious()}
                    type="primary"
                >
                    后退
                </Button>
            </Space>

            <div style={{ marginTop: 10 }}>
                <Tree
                    className="draggable-tree"
                    draggable
                    blockNode
                    onDrop={onDrop}
                    treeData={treeData ? [treeData] : []}
                    titleRender={(node) => {
                        return (
                            <CustomTitle
                                node={node}
                                onModify={handleModifyNode}
                                onCreate={handleCreateNode}
                                onDelete={handleDeleteNode}
                            />
                        );
                    }}
                />
            </div>

            <div style={{ marginTop: 10, whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(treeData, null, 2)}
            </div>
        </div>
    );
};

export default OperationRecord;
