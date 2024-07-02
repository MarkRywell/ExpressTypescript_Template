/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import path from 'path';

export default async (): Promise<Config> => {
  return {
      verbose: true,
      forceExit: true,
      preset: 'ts-jest',
      clearMocks: true,
      coverageProvider: "v8",
      testEnvironment: 'node',
      transform: {
          '^.+\\.ts$': 'ts-jest',
      },
      moduleFileExtensions: ['ts', 'js'],
      globalSetup: './src/test/config/setup.ts',
      globalTeardown: './src/test/config/teardown.ts',
      setupFiles: ['./src/test/config/global.ts'],
      roots: ['<rootDir>/src'],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths,
          { prefix: path.join(__dirname, './') }
      )
  }
}



