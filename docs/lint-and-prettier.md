# Lint and Prettier

This project uses lint also for formatting. Read
[why Prettier is not used for every file type](https://antfu.me/posts/why-not-prettier) by antfu.

This project uses [antfu/eslint-config](https://github.com/antfu/eslint-config) for eslint most of the files.

Keep in mind that the plugin names are renamed, see
[Plugins Rename](https://github.com/antfu/eslint-config?tab=readme-ov-file#plugins-renaming), e.g.:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```
