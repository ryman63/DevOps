module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx', 'json'],
    testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
      '^.+\\.(css|scss|less)$': 'jest-transform-stub', // Альтернатива identity-obj-proxy
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
      '^@/(.*)$': '<rootDir>/src/$1' // Если используете алиасы
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transformIgnorePatterns: [
      '/node_modules/(?!your-module-to-transform)', // Исключения для трансформации
    ],
  };