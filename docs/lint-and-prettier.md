# Lint and Prettier

This project uses ESLint for both linting and formatting. Read
[why Prettier is not used for every file type](https://antfu.me/posts/why-not-prettier) by antfu.

This project uses ESLint for both linting and formatting most files, via [antfu/eslint-config](https://github.com/antfu/eslint-config).

Keep in mind that the plugin names are renamed, see
[Plugins Rename](https://github.com/antfu/eslint-config?tab=readme-ov-file#plugins-renaming), e.g.:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```
