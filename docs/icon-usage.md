# Icon Usage

## Used Icon Collections

This project uses the following icon collections in descending order, try sticking to them and use from top to bottom.

_Tip_: Favorite them and use the search over all item collections at once: https://icon-sets.iconify.design/?list=favorite

| Full name               | Shorthand      | License                                                       | Note             |
| ----------------------- | -------------- | ------------------------------------------------------------- | ---------------- |
| `Lucide`                | `lucide`       | ISC License (commercial use allowed, no attribution required) |                  |
| `Material Design Icons` | `mdi`          | Apache 2.0 (commercial use allowed, no attribution required)  |                  |
| `Simple Icons`          | `simple-icons` | CC0 1.0 (public domain, no attribution required)              | Brand logos only |

## Icons Set in Nuxt Studio CMS

Icon names are collected at build time from project files in `app/`, `shared/`, and `content/` (for example `.json`, `.md`, `.yml`). If you change an icon name in Nuxt Studio, the new icon appears after the next build. For detection to work, the icon name must exist as a literal string in one of those scanned files. Literal strings in helpers or constants are detected too when those files are inside the scanned folders.

> [!WARNING]
> If you choose a new icon that is not used anywhere in the project yet, Nuxt Studio live preview can show no icon until the next rebuild and redeploy. A missing icon in preview during editing does not mean the icon name is invalid.
