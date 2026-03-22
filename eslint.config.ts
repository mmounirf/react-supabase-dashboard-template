import eslintJs from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import { tanstackConfig } from "@tanstack/eslint-config";
import pluginRouter from "@tanstack/eslint-plugin-router";
import pluginReact from "@eslint-react/eslint-plugin";

export default defineConfig([
  globalIgnores([".output", "./src/database.types.ts", "./src/vite-env.d.ts"]),
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      ...tanstackConfig,
      ...pluginRouter.configs["flat/recommended"],
      pluginReact.configs.recommended,
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
    ],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["default"],
              message:
                "Import specific React members instead of default import",
            },
          ],
          patterns: [
            {
              group: ["react"],
              importNamePattern: "^\\*$",
              message:
                "Use named imports from 'react' instead of namespace import",
            },
          ],
        },
      ],
    },
  },
  {
    // Specific rules for shadcn/ui components
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      // Prevent "use client" directives
      "no-restricted-syntax": [
        "error",
        {
          selector: "ExpressionStatement[directive='use client']",
          message: '"use client" directive is not needed in TanStack Start',
        },
      ],
    },
  },
]);
