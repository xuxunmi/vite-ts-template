/**
 * // 移除el-table树中的指定节点集合,可以用于前端table多行勾选假删除
 * 移除树中的指定节点集合
 * @param {*} tree 树
 * @param {*} items 节点集合
 */
export function removeItemsInTree<T>(tree: any, items: Array<T>): void {
    items.forEach(item => removeItemInTree(tree, item))
}

/**
 * 移除树中的指定节点
 * @param {*} tree 树
 * @param {*} node 节点
 */
export function removeItemInTree(tree: any, node: any) {
    const index = tree.indexOf(node)
    if (index !== -1) {
        tree.splice(index, 1)
        return true
    }
    for (const childNode of tree) {
        if (childNode.children?.length) {
            if (removeItemInTree(childNode.children, node)) {
                return true
            }
        }
    }
    return false
}
