import Sort from '../Sort';

export default class BubbleSort extends Sort {
  sort(originalArray) {
    // 标识交换是否已经发生
    let swapped = false;
    const array = [...originalArray];

    for (let i = 1; i < array.length; i += 1) {
      swapped = false;

      this.callbacks.visitingCallback(array[i]);

      for (let j = 0; j < array.length - i; j += 1) {
        this.callbacks.visitingCallback(array[j]);

        // 交换元素，将较大的往后移
        if (this.comparator.lessThan(array[j + 1], array[j])) {
          const tmp = array[j + 1];
          array[j + 1] = array[j];
          array[j] = tmp;

          // 重置标识
          swapped = true;
        }
      }

      // 如果没有发生交换说明数组已经排好序
      if (!swapped) {
        return array;
      }
    }

    return array;
  }
}
