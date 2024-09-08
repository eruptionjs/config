/**
 * This file was inspired by the following project:
 * https://github.com/epicweb/eslint-config
 * The changes made are to make it work with EruptionJS projects and make it
 * more opinionated for our use case.
 */
import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'

const ERROR = 'error'
const WARN = 'warn'

const has = (pkg) => {
  try {
    import.meta.resolve(pkg, import.meta.url)
    return true
  } catch {
    return false
  }
}

const hasTypeScript = has('typescript')
const hasReact = has('react')
const hasTestingLibrary = has('@testing-library/dom')
const hasJestDom = has('@testing-library/jest-dom')
const hasVitest = has('vitest')
const vitestFiles = ['**/__tests__/**/*', '**/*.test.*']
const testFiles = ['**/tests/**', '**/#tests/**', ...vitestFiles]
const playwrightFiles = ['**/e2e/**']

export const config = [
  {
    ignores: [
      '**/.cache/**',
      '**/node_modules/**',
      '**/build/**',
      '**/public/build/**',
      '**/playwright-report/**',
      '**/server-build/**',
      '**/dist/**',
    ],
  },

  // all files
  {
    plugins: {
      import: (await import('eslint-plugin-import-x')).default,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unexpected-multiline': ERROR,
      'no-warning-comments': [ERROR, { terms: ['FIXME'], location: 'anywhere' }],
      'import/no-duplicates': [ERROR, { 'prefer-inline': true }],
      'import/no-self-import': ERROR,
      'import/no-relative-packages': ERROR,
      'import/no-relative-parent-imports': ERROR,
      'import/consistent-type-specifier-style': [ERROR, 'prefer-inline'],
      'import/no-empty-named-blocks': ERROR,
      'import/no-extraneous-dependencies': ERROR,
      'import/no-import-module-exports': ERROR,
      'import/newline-after-import': ERROR,
      'import/group-exports': ERROR,
      'import/exports-last': ERROR,
      'import/no-useless-path-segments': [ERROR, { noUselessIndex: true }],
    },
  },

  // JSX/TSX files
  hasReact
    ? {
        files: ['**/*.tsx', '**/*.jsx'],
        plugins: {
          react: (await import('eslint-plugin-react')).default,
        },
        languageOptions: {
          parser: (await import('typescript-eslint')).parser,
          parserOptions: {
            jsx: true,
          },
        },
        rules: {
          'react/jsx-key': WARN,
        },
      }
    : null,

  // react-hook rules are applicable in ts/js/tsx/jsx, but only with React as a
  // dep
  hasReact
    ? {
        files: ['**/*.ts?(x)', '**/*.js?(x)'],
        plugins: {
          'react-hooks': fixupPluginRules(await import('eslint-plugin-react-hooks')),
        },
        rules: {
          'react-hooks/rules-of-hooks': ERROR,
          'react-hooks/exhaustive-deps': ERROR,
        },
      }
    : null,

  // JS and JSX files
  {
    files: ['**/*.js?(x)'],
    rules: {
      'no-unused-vars': [
        WARN,
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^ignored',
        },
      ],
    },
  },

  // TS and TSX files
  hasTypeScript
    ? {
        files: ['**/*.ts?(x)'],
        languageOptions: {
          parser: (await import('typescript-eslint')).parser,
          parserOptions: {
            projectService: true,
          },
        },
        plugins: {
          '@typescript-eslint': (await import('typescript-eslint')).plugin,
        },
        rules: {
          '@typescript-eslint/no-unused-vars': [
            WARN,
            {
              args: 'after-used',
              argsIgnorePattern: '^_',
              ignoreRestSiblings: true,
              varsIgnorePattern: '^ignored',
            },
          ],
          'import/consistent-type-specifier-style': [WARN, 'prefer-inline'],
          '@typescript-eslint/consistent-type-imports': [
            WARN,
            {
              prefer: 'type-imports',
              disallowTypeAnnotations: true,
              fixStyle: 'inline-type-imports',
            },
          ],
          '@typescript-eslint/no-misused-promises': [ERROR, { checksVoidReturn: false }],
          '@typescript-eslint/no-floating-promises': ERROR,
        },
      }
    : null,

  // Restrict importing test files in source files
  {
    files: ['**/*.ts?(x)', '**/*.js?(x)'],
    ignores: testFiles,
    rules: {
      'no-restricted-imports': [
        ERROR,
        {
          patterns: [
            {
              group: testFiles,
              message: 'Do not import test files in source files',
            },
          ],
        },
      ],
    },
  },

  // Testing Library rules
  hasTestingLibrary
    ? {
        files: testFiles,
        ignores: [...playwrightFiles],
        plugins: {
          'testing-library': (await import('eslint-plugin-testing-library')).default,
        },
        rules: {
          'testing-library/no-unnecessary-act': [ERROR, { isStrict: false }],
          'testing-library/no-wait-for-side-effects': ERROR,
          'testing-library/prefer-find-by': ERROR,
        },
      }
    : null,

  // Jest DOM rules
  hasJestDom
    ? {
        files: testFiles,
        ignores: [...playwrightFiles],
        plugins: {
          'jest-dom': (await import('eslint-plugin-jest-dom')).default,
        },
        rules: {
          'jest-dom/prefer-checked': ERROR,
          'jest-dom/prefer-enabled-disabled': ERROR,
          'jest-dom/prefer-focus': ERROR,
          'jest-dom/prefer-required': ERROR,
        },
      }
    : null,

  // Vitest rules
  hasVitest
    ? {
        files: testFiles,
        ignores: [...playwrightFiles],
        plugins: {
          vitest: (await import('eslint-plugin-vitest')).default,
        },
        rules: {
          'vitest/no-focused-tests': [WARN, { fixable: false }],
        },
      }
    : null,
].filter(Boolean)

// this is for backward compatibility
export default config
