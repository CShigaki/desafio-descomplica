/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    "^root(.*)$": "<rootDir>$1",
    "^config(.*)$": "<rootDir>/config$1",
    "^db(.*)$": "<rootDir>/src/db$1",
    "^schema(.*)$": "<rootDir>/src/schema$1",
    "^routes(.*)$": "<rootDir>/src/routes$1"
  }
};