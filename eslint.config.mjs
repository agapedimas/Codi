import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...
  compat.config({
    extends: ["next", "next/typescript"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-sync-scripts": "off",
      '@typescript-eslint/no-explicit-any': 'off',
    }
  })
];

export default eslintConfig;
