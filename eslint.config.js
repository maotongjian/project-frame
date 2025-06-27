import js from '@eslint/js';
import globals from 'globals';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: {
      js,
      vue,
    },
    extends: ['js/recommended', 'vue/recommended'],
    rules: {
      ...prettier.rules,
      'no-unused-vars': 'warn',
      'no-dupe-keys': 'error',
      'no-undef': 'error',
      'no-var': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
]);
