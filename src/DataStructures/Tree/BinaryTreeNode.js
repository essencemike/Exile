import Comparator from '../../Utils/comparator/Comparator';
import HashTable from '../HashTable/HashTable';

export default class BinaryTreeNode {
  constructor(value = null) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    // 可以在此存储任何与节点相关的元信息
    this.meta = new HashTable();

    // 该比较器用于比较二进制数节点
    this.nodeComparator = new Comparator();
  }

  get leftHeight() {
    if (!this.left) {
      return 0;
    }

    return this.left.height + 1;
  }

  get rightHeight() {
    if (!this.right) {
      return 0;
    }

    return this.right.height + 1;
  }

  get height() {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * 如果存在的话，获取父节点的兄弟节点
   */
  get uncle() {
    // 检查当前节点是否有父节点
    if (!this.parent) {
      return undefined;
    }

    // 检查该节点是否存在祖父节点
    // 如果不存在祖父节点，说明该节点的父节点就是顶级节点， 自然不存在兄弟节点
    if (!this.parent.parent) {
      return undefined;
    }

    // 检查该节点的祖父节点是否存在2个子节点
    // 如果没有，说明该节点的父节点只有自己，没有兄弟节点
    if (!this.parent.parent.left || !this.parent.parent.right) {
      return undefined;
    }

    // 此时我们知道当前节点的有祖父节点， 祖父节点有2个子节点
    // 如果当前节点的父节点等于祖父节点的 left 节点， 那么兄弟节点就是祖父节点的 right 节点
    // 反之， 兄弟节点就是祖父节点的 left 节点
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      return this.parent.parent.right;
    }

    return this.parent.parent.left;
  }

  /**
   * 给节点赋值
   * @param {*} value
   * @return {BinaryTreeNode}
   */
  setValue(value) {
    this.value = value;

    return this;
  }

  /**
   * 设置 left 节点
   * @param {BinaryTreeNode} node
   * @return {BinaryTreeNode}
   */
  setLeft(node) {
    // 如果存在 left 节点， 先和父节点分离
    if (this.left) {
      this.left.parent = null;
    }

    // 绑定新的节点
    this.left = node;

    // 使当前节点成为新做节点的父节点
    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  setRight(node) {
    if (this.right) {
      this.right.parent = null;
    }

    this.right = node;

    if (node) {
      this.right.parent = this;
    }

    return this;
  }

  removeChild(nodeToRemove) {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null;
      return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null;
      return true;
    }

    return false;
  }

  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode;
      return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode;
      return true;
    }

    return false;
  }

  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  /**
   * 按序遍历
   */
  traverseInOrder() {
    let traverse = [];

    // 添加 left 节点
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder());
    }

    // 添加 root 节点
    traverse.push(this.value);

    // 添加 right 节点
    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder());
    }

    return traverse;
  }

  toString() {
    return this.traverseInOrder().toString();
  }
}
