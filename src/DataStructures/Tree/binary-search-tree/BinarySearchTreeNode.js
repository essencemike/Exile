import BinaryTreeNode from '../BinaryTreeNode';
import Comparator from '../../../Utils/comparator/Comparator';

export default class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value = null, compareFn = undefined) {
    super(value);

    this.compareFn = compareFn;
    this.nodeValueComparator = new Comparator(compareFn);
  }

  insert(value) {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value;

      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      // 如果插入的值小于当前节点的值，则插入到 left 节点中
      if (this.left) {
        return this.left.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFn);
      this.setLeft(newNode);

      return newNode;
    }

    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFn);
      this.setRight(newNode);

      return newNode;
    }

    return this;
  }

  find(value) {
    // 先检查 root 节点的值
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
      return this.left.find(value);
    }

    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
      return this.right.find(value);
    }

    return null;
  }

  contains(value) {
    return !!this.find(value);
  }

  remove(value) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error('Item not found in the tree');
    }

    const { parent } = nodeToRemove;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // 此时节点是叶子节点， 没有子节点
      // 如果存在父节点， 则只需从父节点中删除指向此节点的指针
      // 如果不存在父节点， 说明此节点是一个孤立节点， 只需删除他的值即可
      if (parent) {
        parent.removeChild(nodeToRemove);
      } else {
        nodeToRemove.setValue(undefined);
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // 此时节点是父节点， 并且有2个子节点
      // 查找下一个最大值（从 right 节点中查找最小值）， 用当前最大值替换当前节点
      const nextBiggerNode = nodeToRemove.right.findMin();
      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        this.remove(nextBiggerNode.value);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        // 如果下一个正确的值是下一个较大的值，并且它没有左子集
        // 那么只需特换将被正确节点删除的节点
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      // 此时节点是父节点， 但是只有一个子节点
      // 使此节点的孩子节点直接变成当前节点的父节点的子节点
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else {
        BinaryTreeNode.copyNode(childNode, nodeToRemove);
      }
    }

    // 清除要删除节点的父节点的指针
    nodeToRemove.parent = null;

    return true;
  }

  findMin() {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }
}
