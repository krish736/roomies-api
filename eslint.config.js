import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin, // Add Prettier as a plugin
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...prettierConfig.rules, // Disable conflicting ESLint rules
      "prettier/prettier": "error", // Run Prettier as an ESLint rule
      "no-console": "off",
      "no-process-exit": "warn",
    },
  },
];
