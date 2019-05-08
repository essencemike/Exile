import LinkedListNode from './LinkedListNode';
import Comparator from '../../Utils/comparator/Comparator';

// 数据结构 ---> 链表
export default class LinkedList {
  constructor(comparatorFn) {
    /** @var LinkedListNode */
    // 链表头部
    this.head = null;

    /** @var LinkedListNode */
    // 链表尾部
    this.tail = null;

    this.compare = new Comparator(comparatorFn);
  }

  /**
   * 向链表头部添加（往前添加节点）
   *
   * @param {*} value （节点值）
   * @return {LinkedList}
   */
  prepend(value) {
    // 让新节点成为头部节点
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // 如果没有为节点（即链表中没有任何节点），让新节点成为尾节点
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * 向链表尾部添加节点
   *
   * @param {*} value
   * @return {LinkedList}
   */
  append(value) {
    const newNode = new LinkedListNode(value);

    // 如果没有头部节点（即链表中没有任何节点），使新节点成为头部节点以及尾部节点
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // 向链表尾部添加节点
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * 根据节点的值， 删除节点, 返回删除的节点
   *
   * @param {*} value
   * @return {LinkedListNode}
   */
  delete(value) {
    // 如果没有头部节点时，即链表为空， 返回 null
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // 如果删除的是头部节点的，即将头部节点设置成原头部节点的下一个节点
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // 遍历整个链表
      // 如果要删除此节点的下一个节点， 则设置此节点的下一个节点为下一个节点的下一个节点
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // 如果删除的是尾部节点
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  /**
   * 根据节点的值，以及自定义查找函数， 来查询节点, 并返回查询到的节点
   *
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */
  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // 如果指定了回调，则尝试通过回调查找节点
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // 如果指定了值， 则通过按值比较
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * 删除尾部节点, 并返回尾部节点
   *
   * @return {LinkedListNode}
   */
  deleteTail() {
    const deletedTail = this.tail;

    // 如果链表中只有一个节点时
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // 如果链表中有多个节点，回退到最后一个节点，并且删除最后一个节点之前的next链接
    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  /**
   * 删除链表头部节点， 并且返回头部节点
   *
   * @return {LinkedListNode}
   */
  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /**
   * 将数组转换成链表
   *
   * @param {*[]} values 需要转换成链表的数组
   * @return {LinkedList}
   */
  fromArray(values) {
    values.forEach(value => this.append(value));

    return this;
  }

  /**
   * 将链表转化成数组，并返回节点数组
   *
   * @return {LinkedListNode[]}
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * 将链表转化成数组，并将节点的value toString
   *
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    return this.toArray().map(node => node.toString(callback)).toString();
  }
}
