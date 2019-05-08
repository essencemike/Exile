import Sort from '../Sort';

export default class QuickSortInPlace extends Sort {
  sort(originalArray, inputLowIndex, inputHighIndex) {
    const array = inputLowIndex === undefined ? [...originalArray] : originalArray;

    const partition = (lowIndex, hightIndex) => {
      const swap = (leftIndex, rightIndex) => {
        const tempVariable = array[leftIndex];
        array[leftIndex] = array[rightIndex];
        array[rightIndex] = tempVariable;
      };

      const pivot = array[hightIndex];
      this.callbacks.visitingCallback(array[pivot]);

      let firstRunner = lowIndex - 1;
      for (let secondRunner = lowIndex; secondRunner < hightIndex; secondRunner += 1) {
        if (this.comparator.lessThan(array[secondRunner], pivot)) {
          firstRunner += 1;
          swap(firstRunner, secondRunner);
        }
      }

      if (this.comparator.lessThan(pivot, array[firstRunner + 1])) {
        swap(firstRunner + 1, hightIndex);
      }

      return firstRunner + 1;
    };

    const lowIndex = inputLowIndex === undefined ? 0 : inputHighIndex;
    const highIndex = inputHighIndex === undefined ? array.length - 1 : inputHighIndex;

    if (lowIndex < highIndex) {
      const partitionIndex = partition(lowIndex, highIndex);

      this.sort(array, lowIndex, partitionIndex - 1);
      this.sort(array, partitionIndex + 1, highIndex);
    }

    return array;
  }
}
