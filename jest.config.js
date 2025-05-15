/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  automock: false,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  modulePathIgnorePatterns: ['/node_modules'],
  modulePaths: ['/node_modules'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules', '/dist'],
  testRegex: '\\.test\\.[jt]sx?$',
};
