/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|mp3)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "^root(.*)$": "<rootDir>$1",
    "^config(.*)$": "<rootDir>/config$1",
    "^db(.*)$": "<rootDir>/src/db$1",
    "^schema(.*)$": "<rootDir>/src/schema$1",
    "^routes(.*)$": "<rootDir>/src/routes$1"
  }
};