import countSetBits from './countSetBits';

/**
 * 计算需要改变的位数， 以便将数字 numberA 转换为数字 numberB
 * @param {number} numberA
 * @param {number} numberB
 * @return {number}
 */
export default function bitsDiff(numberA, numberB) {
  return countSetBits(numberA ^ numberB);
}
