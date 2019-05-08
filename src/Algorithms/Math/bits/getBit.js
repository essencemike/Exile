/**
 * @param {number} number
 * @param {number} bitPosition 从 0 开始
 * @return {number}
 */
export default function getBit(number, bitPosition) {
  return (number >> bitPosition) & 1;
}
