module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    "^lib/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.spec.json'
    }
  }
};
