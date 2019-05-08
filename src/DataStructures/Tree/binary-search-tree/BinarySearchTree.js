import BinarySearchTreeNode from './BinarySearchTreeNode';

// 数据结构 ---> 二叉查找树
export default class BinarySearchTree {
  constructor(nodeValueCompareFn) {
    this.root = new BinarySearchTreeNode(null, nodeValueCompareFn);

    // 从根节点中获取 node 比较器
    this.nodeComparator = this.root.nodeComparator;
  }

  insert(value) {
    return this.root.insert(value);
  }

  contains(value) {
    return this.root.contains(value);
  }

  remove(value) {
    return this.root.remove(value);
  }

  toString() {
    return this.root.toString();
  }
}
