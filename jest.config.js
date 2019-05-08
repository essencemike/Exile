module.exports = {
  // 是否让Jest在第一次失败之后停止运行测试
  bail: false,
  // 是否应在运行期间报告每个单独的测试
  verbose: false,
  // 在执行测试时是否应收集覆盖率信息
  collectCoverage: false,
  // Jest应输出其coverage文件的目录
  coverageDirectory: './coverage/',
  // 忽略测试路径
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  // 忽略测试覆盖率
  coveragePathIgnorePatterns: ['<rootDir>/node_modules'],
  // 匹配测试文件的正则
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
};
