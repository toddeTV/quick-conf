// @ts-check
// import withNuxt from './.nuxt/eslint.config.mjs'
import antfu from '@antfu/eslint-config'

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
            // ignore the `packageManager` in `package.json`
            ignorePattern: '^\\s*"packageManager":\\s*["\']',
          },
        ],
      },
    },

    typescript: true,

    vue: true,

    yaml: true,
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
      '**/*.yaml',
      '**/*.yml',
    ],

    ignores: [
    ],

    plugins: {
    },

    rules: {
      'antfu/consistent-chaining': [
        'off',
      ],
      'import/extensions': [ // ensure consistent file extensions in import declarations
        'error',
        'always',
        {
          gltf: 'always',
          js: 'always',
          ts: 'never',
          vue: 'always',
        },
      ],
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
    // Disable max-len rule specifically for Markdown files
    files: ['**/*.md'],
    rules: {
      'style/max-len': 'off',
    },
  },
)
