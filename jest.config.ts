import type {Config} from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mts|mtsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|png|jpg|jpeg|svg|eot|otf|ttf|woff|woff2)$':
      '<rootDir>/__mocks__/fileMock.ts',
  },
  coverageReporters: ['cobertura', 'json-summary', 'json'],
}
export default config
