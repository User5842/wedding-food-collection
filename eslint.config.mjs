import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignorePatterns: [
      "node_modules/", // Ignore the node_modules folder
      "dist/", // Ignore build output folder
      "public/", // Ignore static assets (public folder)
      "src/hooks/",
    ],
  },
];

export default eslintConfig;
