import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import Parser from "@typescript-eslint/parser";
import pluginTs from "@typescript-eslint/eslint-plugin";
import airbnb from "eslint-config-airbnb";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: "readonly"
      },
      ecmaVersion: 2022,
      sourceType: "module",
      parser: Parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {...pluginTs, ...pluginJs},
    rules: {
      'react/jsx-filename-extension': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-explicit-any': 'off', 
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      "@typescript-eslint/ban-ts-comment": "error"
    }
  },
  // pluginJs.configs.recommended,
  airbnb.rules,
  ...tseslint.configs.recommended,
];
