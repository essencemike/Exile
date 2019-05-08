import Sort from '../Sort';

export default class InsertionSort extends Sort {
  sort(originalArray) {
    const array = [...originalArray];

    for (let i = 0; i < array.length; i += 1) {
      let currentIndex = i;

      this.callbacks.visitingCallback(array[i]);

      while (
        array[currentIndex - 1] !== undefined &&
        this.comparator.lessThan(array[currentIndex], array[currentIndex - 1])
      ) {
        this.callbacks.visitingCallback(array[currentIndex - 1]);

        const tmp = array[currentIndex - 1];
        array[currentIndex - 1] = array[currentIndex];
        array[currentIndex] = tmp;

        currentIndex -= 1;
      }
    }

    return array;
  }
}
