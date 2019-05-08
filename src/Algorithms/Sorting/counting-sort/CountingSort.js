import Sort from '../Sort';

export default class CountingSort extends Sort {
  sort(originalArray, smallestElement = undefined, biggestElement = undefined) {
    let detectedSmallestElement = smallestElement || 0;
    let detectedBiggestElement = biggestElement || 0;

    if (smallestElement === undefined || biggestElement === undefined) {
      originalArray.forEach((element) => {
        this.callbacks.visitingCallback(element);

        if (this.comparator.greaterThan(element, detectedBiggestElement)) {
          detectedBiggestElement = element;
        }

        if (this.comparator.lessThan(element, detectedSmallestElement)) {
          detectedSmallestElement = element;
        }
      });
    }

    const buckets = Array(detectedBiggestElement - detectedSmallestElement + 1).fill(0);

    originalArray.forEach((element) => {
      this.callbacks.visitingCallback(element);

      buckets[element - detectedSmallestElement] += 1;
    });

    for (let bucketIndex = 1; bucketIndex < buckets.length; bucketIndex += 1) {
      buckets[bucketIndex] += buckets[bucketIndex - 1];
    }

    buckets.pop();
    buckets.unshift(0);

    const sortedArray = Array(originalArray.length).fill(null);

    for (let elementIndex = 0; elementIndex < originalArray.length; elementIndex += 1) {
      const element = originalArray[elementIndex];

      this.callbacks.visitingCallback(element);

      const elementSortedPosition = buckets[element - detectedSmallestElement];

      sortedArray[elementSortedPosition] = element;

      buckets[element - detectedSmallestElement] += 1;
    }

    return sortedArray;
  }
}
