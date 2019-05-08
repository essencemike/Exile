import LinkedList from '../LinkedList/LinkedList';

// 数据结构 ---> 队列
export default class Queue {
  constructor() {
    this.LinkedList = new LinkedList();
  }

  isEmpty() {
    return !this.LinkedList.tail;
  }

  /**
   * 取出队列的第一个值
   */
  peek() {
    if (!this.LinkedList.head) {
      return null;
    }

    return this.LinkedList.head.value;
  }

  /**
   * 向队列中添加元素
   *
   * @param {*} value
   * @memberof Queue
   */
  enqueue(value) {
    this.LinkedList.append(value);
  }

  dequeue() {
    const removedHead = this.LinkedList.deleteHead();

    return removedHead ? removedHead.value : null;
  }

  toString(callback) {
    return this.LinkedList.toString(callback);
  }
}
