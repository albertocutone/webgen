module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests/unit', '<rootDir>/src'],
  testMatch: ['**/*.test.{js,jsx}'],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],
  moduleNameMapper: {
    // Jest cannot parse Tailwind's CSS; styles are not under unit test.
    '\\.(css|less|scss)$': '<rootDir>/tests/unit/__mocks__/styleMock.cjs',
    '\\.(png|jpe?g|gif|svg|webp|avif)$': '<rootDir>/tests/unit/__mocks__/fileMock.cjs',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/main.jsx'],
}
