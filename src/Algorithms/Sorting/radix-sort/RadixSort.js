import Sort from '../Sort';

const BASE_CHAR_CODE = 97;
const NUMBER_OF_POSSIBLE_DIGITS = 10;
const ENGLISH_ALPHABET_LENGTH = 26;

export default class RadixSort extends Sort {
  sort(originalArray) {
    const isArrayOfNumbers = this.isArrayOfNumbers(originalArray);

    let sortedArray = [...originalArray];
    const numPasses = this.determineNumPasses(sortedArray);

    for (let currentIndex = 0; currentIndex < numPasses; currentIndex += 1) {
      const buckets = isArrayOfNumbers
        ? this.placeElementsInNumberBuckets(sortedArray, currentIndex)
        : this.placeElementsInCharacterBuckets(sortedArray, currentIndex, numPasses);

      sortedArray = buckets.reduce((acc, val) => {
        return [...acc, ...val];
      }, []);
    }

    return sortedArray;
  }

  placeElementsInNumberBuckets(array, index) {
    const modded = 10 ** (index + 1);
    const divided = 10 ** index;
    const buckets = this.createBuckets(NUMBER_OF_POSSIBLE_DIGITS);

    array.forEach((element) => {
      this.callbacks.visitingCallback(element);

      if (element < divided) {
        buckets[0].push(element);
      } else {
        const currentDigit = Math.floor((element % modded) / divided);
        buckets[currentDigit].push(element);
      }
    });

    return buckets;
  }

  placeElementsInCharacterBuckets(array, index, numPasses) {
    const buckets = this.createBuckets(ENGLISH_ALPHABET_LENGTH);

    array.forEach((element) => {
      this.callbacks.visitingCallback(element);
      const currentBucket = this.getCharCodeOfElementAtIndex(element, index, numPasses);
      buckets[currentBucket].push(element);
    });

    return buckets;
  }

  getCharCodeOfElementAtIndex(element, index, numPasses) {
    if ((numPasses - index) > element.length) {
      return ENGLISH_ALPHABET_LENGTH - 1;
    }

    const charPos = index > element.length - 1 ? 0 : element.length - index - 1;

    return element.toLowerCase().charCodeAt(charPos) - BASE_CHAR_CODE;
  }

  determineNumPasses(array) {
    return this.getLengthOfLongestElement(array);
  }

  getLengthOfLongestElement(array) {
    if (this.isArrayOfNumbers(array)) {
      return Math.floor(Math.log10(Math.max(...array))) + 1;
    }

    return array.reduce((acc, val) => {
      return val.length > acc ? val.length : acc;
    }, -Infinity);
  }

  isArrayOfNumbers(array) {
    return this.isNumber(array[0]);
  }

  createBuckets(numBuckets) {
    return new Array(numBuckets).fill(null).map(() => []);
  }

  isNumber(element) {
    return Number.isInteger(element);
  }
}
