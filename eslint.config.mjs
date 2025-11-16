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
            // ignore the `packageManager` in `package.json` and SVG path d attributes
            ignorePattern: '^\\s*("packageManager":\\s*["\']|d=")',
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
    },

    rules: {
      'antfu/consistent-chaining': [
        'off',
      ],
      // TODO check if this should better be used, as after updating dependencies in #todo this does not work anymore
      // 'import/extensions': [ // ensure consistent file extensions in import declarations
      //   'error',
      //   'ignorePackages',
      //   {
      //     gltf: 'always',
      //     js: 'never',
      //     json: 'always',
      //     mjs: 'never',
      //     ts: 'never',
      //     vue: 'never',
      //   },
      // ],
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
  {
    // Node-run ESM files often require explicit extensions in relative imports
    files: [
      '**/*.mjs',
      '**/*.cjs',
      '**/*.config.*',
      'scripts/**/*.{js,mjs}',
    ],
    rules: {
      // TODO check if this should better be used, as after updating dependencies in #todo this does not work anymore
      // 'import/extensions': ['error', 'ignorePackages', {
      //   js: 'always',
      //   mjs: 'always',
      //   ts: 'never',
      //   vue: 'never',
      // }],
    },
  },
)
