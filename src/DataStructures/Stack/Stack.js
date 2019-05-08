import LinkedList from '../LinkedList/LinkedList';

// 数据结构 ---> 栈
export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.tail;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.tail.value;
  }

  push(value) {
    this.linkedList.append(value);
  }

  pop() {
    const removedTail = this.linkedList.deleteTail();
    return removedTail ? removedTail.value : null;
  }

  toArray() {
    return this.linkedList
      .toArray()
      .map(node => node.value)
      .reverse();
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
