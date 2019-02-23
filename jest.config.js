module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '__tests__',
  testPathIgnorePatterns: [
    'node_modules', 'dist'
  ]
}