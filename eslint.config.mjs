// @ts-check
// import withNuxt from './.nuxt/eslint.config.mjs'
import antfu from '@antfu/eslint-config'
import importX from 'eslint-plugin-import-x'

export default antfu(
  {
    formatters: {
      css: 'prettier',
      html: 'prettier',
      markdown: 'prettier',
    },

    jsonc: true,

    stylistic: {
      indent: 2,
      quotes: 'single',
      overrides: {
        'style/max-len': [
          'error',
          {
            code: 120,
            // ignore the `packageManager` and `description` in `package.json` and SVG path d attributes
            ignorePattern: '^\\s*("(packageManager|description)":\\s*["\']|d=")',
          },
        ],
      },
    },

    typescript: true,

    vue: true,

    yaml: true,

    markdown: true,
  },
  {
    files: [
      '**/*.html',
      '**/*.js',
      '**/*.json',
      '**/*.md',
      '**/*.ts',
      '**/*.vue',
      '**/*.yaml',
      '**/*.yml',
    ],
    ignores: [
    ],
    plugins: {
      'import-x': importX,
    },
    rules: {
      'antfu/consistent-chaining': [
        'off',
      ],
      'import-x/extensions': 'off',
      'jsonc/sort-keys': [
        'error',
      ],
      'vue/attributes-order': [
        'error',
        {
          alphabetical: true,
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          multiline: 1,
          singleline: 3,
        },
      ],
    },
  },
  {
    /**
     * Disable max-len rule in markdown & YAML files
     */
    files: [
      '**/*.md',
      '**/*.yaml',
      '**/*.yml',
    ],
    rules: {
      'style/max-len': 'off',
    },
  },
  {
    /**
     * Node-run ESM files often require explicit extensions in relative imports.
     * // TODO: Enforce this rule once project specifications are stabilized. Currently disabled to avoid breakage.
     */
    files: [
      '**/*.mjs',
      '**/*.cjs',
      '**/*.config.*',
      'scripts/**/*.{js,mjs}',
    ],
    plugins: {
      'import-x': importX,
    },
    rules: {
      'import-x/extensions': 'off',
    },
  },
  {
    /**
     * Disable JSONC sort-keys rule for VSCode settings & TS config file
     */
    files: [
      '.vscode/settings.json',
      'tsconfig.json',
    ],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  },
  {
    files: [
      'quick-conf-cli.mjs',
    ],
    rules: {
      'no-console': 'off',
      'node/prefer-global/process': 'off',
    },
  },
)
