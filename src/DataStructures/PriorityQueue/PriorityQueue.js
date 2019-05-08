import MinHeap from '../Heap/MinHeap';
import Comparator from '../../Utils/comparator/Comparator';

// 数据结构 ---> 优先队列
// 它与 minHeap 堆相同，除了元素比较时，我们考虑的不是元素的值
// 而是它的优先级
export default class PriorityQueue extends MinHeap {
  constructor() {
    super();
    this.priorities = {};
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  add(item, priority = 0) {
    this.priorities[item] = priority;
    super.add(item);

    return this;
  }

  remove(item, customFindingComparator) {
    super.remove(item, customFindingComparator);
    delete this.priorities[item];

    return this;
  }

  changePriority(item, priority) {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);

    return this;
  }

  findByValue(item) {
    return this.find(item, new Comparator(this.compareValue));
  }

  hasValue(item) {
    return this.findByValue(item).length > 0;
  }

  comparePriority(a, b) {
    if (this.priorities[a] === this.priorities[b]) {
      return 0;
    }

    return this.priorities[a] < this.priorities[b] ? -1 : 1;
  }

  compareValue(a, b) {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }
}
