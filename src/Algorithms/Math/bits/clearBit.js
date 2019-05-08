/**
 * @param {number} number
 * @param {number} bitPosition 从 0 开始
 * @return {number}
 */
export default function clearBit(number, bitPosition) {
  const mask = ~(1 << bitPosition);

  return number & mask;
}
