// 数据结构 ---> 树状数组
export default class FenwickTree {
  /**
   * 创建一个 arraySize 大小的空树
   * 但是， 数组大小要加1， 因为索引是从1开始的
   * @param {number} arraySize
   */
  constructor(arraySize) {
    this.arraySize = arraySize;

    this.treeArray = Array(this.arraySize + 1).fill(0);
  }

  /**
   * 在该位置上添加值
   * @param {number} position
   * @param {number} value
   * @return {FenwickTree}
   */
  increase(position, value) {
    if (position < 1 || position > this.arraySize) {
      throw new Error('Position is out of allowed range');
    }

    /**
     * 1 & -1 = 1
     * 2 & -2 = 2
     * 3 & -3 = 1
     * 4 & -4 = 2
     */
    for (let i = position; i <= this.arraySize; i += (i & -i)) {
      this.treeArray[i] += value;
    }

    return this;
  }

  query(position) {
    if (position < 1 || position > this.arraySize) {
      throw new Error('Position is out of allowed range');
    }

    let sum = 0;

    for (let i = position; i > 0; i -= (i & -i)) {
      sum += this.treeArray[i];
    }

    return sum;
  }

  queryRange(leftIndex, rightIndex) {
    if (leftIndex > rightIndex) {
      throw new Error('Left index can not be greater then right one');
    }

    if (leftIndex === 1) {
      return this.query(rightIndex);
    }

    return this.query(rightIndex) - this.query(leftIndex - 1);
  }
}
