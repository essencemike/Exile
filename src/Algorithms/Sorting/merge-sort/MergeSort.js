import Sort from '../Sort';

export default class MergeSort extends Sort {
  sort(originalArray) {
    this.callbacks.visitingCallback(null);

    if (originalArray.length <= 1) {
      return originalArray;
    }

    const middleIndex = Math.floor(originalArray.length / 2);
    const leftArray = originalArray.slice(0, middleIndex);
    const rightArray = originalArray.slice(middleIndex, originalArray.length);

    const leftSortedArray = this.sort(leftArray);
    const rightSortedArray = this.sort(rightArray);

    return this.mergeSortedArrays(leftSortedArray, rightSortedArray);
  }

  mergeSortedArrays(leftArray, rightArray) {
    let sortedArray = [];

    while (leftArray.length && rightArray.length) {
      let minimumElement = null;

      if (this.comparator.lessThanOrEqual(leftArray[0], rightArray[0])) {
        minimumElement = leftArray.shift();
      } else {
        minimumElement = rightArray.shift();
      }

      this.callbacks.visitingCallback(minimumElement);

      sortedArray.push(minimumElement);
    }

    if (leftArray.length) {
      sortedArray = sortedArray.concat(leftArray);
    }

    if (rightArray.length) {
      sortedArray = sortedArray.concat(rightArray);
    }

    return sortedArray;
  }
}
