/**
 * @param {number} originalNumber
 * @return {number}
 */
export default function countSetBits(originalNumber) {
  let setBitsCount = 0;
  let number = originalNumber;

  while (number) {
    // 将数字的最后一位添加的设置位的总和
    setBitsCount += number & 1;

    // 将数字右移一位以调查其他位
    number >>= 1;
  }

  return setBitsCount;
}
