import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    typescript: true,
    stylistic: true,
  },
})
  .append({
    ignores: [
      'node_modules/**',
      '.nuxt/**',
      '.output/**',
      'dist/**',
      '.nitro/**',
      '.cache/**',
      '*.config.js',
      '*.config.ts',
      'bun.lock',
    ],
  })
  .override('nuxt/typescript/rules', {
    rules: {
      // ==========================================
      // TYPESCRIPT STRICT RULES - Clean Code
      // ==========================================
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: false,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      }],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-implicit-any-catch': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
      }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // ==========================================
      // VUE SPECIFIC RULES
      // ==========================================
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'error',
      'vue/require-explicit-emits': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-macros-order': ['error', {
        order: ['defineProps', 'defineEmits'],
      }],
      'vue/no-unused-refs': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/prefer-separate-static-class': 'error',

      // ==========================================
      // CLEAN CODE PRINCIPLES
      // ==========================================
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'no-magic-numbers': ['warn', {
        ignore: [0, 1, -1],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
      }],
      'complexity': ['warn', 10],
      'max-depth': ['warn', 3],
      'max-lines-per-function': ['warn', {
        max: 50,
        skipBlankLines: true,
        skipComments: true,
      }],
      'max-params': ['warn', 4],

      // ==========================================
      // CODE QUALITY
      // ==========================================
      'eqeqeq': ['error', 'always'],
      'no-duplicate-imports': 'error',
      'no-return-await': 'error',
      'require-await': 'error',
      'no-unreachable': 'error',
      'curly': ['error', 'all'],
      'default-case': 'error',
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-useless-return': 'error',
    },
  })
  .override('nuxt/vue/rules', {
    rules: {
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1,
      }],
    },
  })