import BinarySearchTree from '../binary-search-tree/BinarySearchTree';

// 数据结构 ---> avl树（具有平衡因子的树）
export default class AvlTree extends BinarySearchTree {
  insert(value) {
    // 正常插入到树中
    super.insert(value);

    // 向上移动到 root， 并检查是否达到平衡
    let currentNode = this.root.find(value);
    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }
  }

  remove(value) {
    throw new Error(`Can't remove ${value}. Remove method is not implemented yet`);
  }

  /**
   * 使树平衡
   * @param {BinarySearchTreeNode} node
   */
  balance(node) {
    // 如果平衡因子不正确，则尝试平衡节点
    // 左边节点比较多
    if (node.balanceFactor > 1) {
      // 左边节点的左节点多
      if (node.left.balanceFactor > 0) {
        this.rotateLeftLeft(node);
      } else if (node.left.balanceFactor < 0) {
        // 左边节点左节点少
        this.rotateLeftRight(node);
      }
    } else if (node.balanceFactor < -1) {
      // 右节点比较多
      // 右节点的右节点比较多
      if (node.right.balanceFactor < 0) {
        this.rotateRightRight(node);
      } else if (node.right.balanceFactor > 0) {
        // 右节点的右节点比较少
        this.rotateRightLeft(node);
      }
    }
  }

  rotateLeftLeft(rootNode) {
    // 从 root 节点中分离 left 节点
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    // 使左节点成为 rootNode 的父节点的左节点
    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode);
    } else if (rootNode === this.root) {
      this.root = leftNode;
    }

    if (leftNode.right) {
      rootNode.setLeft(leftNode.right);
    }

    leftNode.setRight(rootNode);
  }

  rotateLeftRight(rootNode) {
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    const leftRightNode = leftNode.right;
    leftNode.setRight(null);

    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left);
      leftRightNode.setLeft(null);
    }

    rootNode.setLeft(leftRightNode);

    leftRightNode.setLeft(leftNode);

    this.rotateLeftLeft(rootNode);
  }

  rotateRightLeft(rootNode) {
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    const rightLeftNode = rightNode.left;
    rightNode.setLeft(null);

    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right);
      rightLeftNode.setRight(null);
    }

    rootNode.setRight(rightLeftNode);

    rightLeftNode.setRight(rightNode);

    this.rotateRightRight(rootNode);
  }

  rotateRightRight(rootNode) {
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode);
    } else if (rootNode === this.root) {
      this.root = rightNode;
    }

    if (rightNode.left) {
      rootNode.setRight(rightNode.left);
    }

    rightNode.setLeft(rootNode);
  }
}
