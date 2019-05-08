/**
 * 使用按位运算符乘以无符号数
 * 按位乘法的主要思想是每个数字都可以被分割到两个权力的总和：
 *
 * 19 = 2^4 + 2^1 + 2^0
 *
 * 然后将数字 x 乘以 19 相当于
 * x * 19 = x * 2^4 + x * 2^1 + x * 2^0
 *
 * 现在我们需要记住 x * 2^4 相当于将 x 左移 4 位 (x << 4)
 * @param {number} number1
 * @param {number} number2
 * @return {number}
 */
export default function multiplyUnsigned(number1, number2) {
  let result = 0;

  // 我们将 number2 视为 number1 的乘数
  let multiplier = number2;

  // 乘数当前的索引
  let bitIndex = 0;

  while (multiplier !== 0) {
    if (multiplier & 1) {
      result += (number1 << bitIndex)
    }

    bitIndex += 1;
    multiplier >>= 1;
  }

  return result;
}
