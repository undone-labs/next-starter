import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsdoc from "eslint-plugin-tsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Add TSDoc linting configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      tsdoc
    },
    rules: {
      "tsdoc/syntax": "error"
    }
  }
];

export default eslintConfig;
