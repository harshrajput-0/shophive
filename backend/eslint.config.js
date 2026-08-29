import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "dist/**"],
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  js.configs.recommended,
];
