# AppLandingSponsors

## Description

Displays a grid of sponsors. Data is automatically fetched from the `sponsors` content collection.

## Screenshot

![AppLandingSponsors Screenshot](/docs/assets/landing-page-blocks/AppLandingSponsors.png)

## Props

| Prop Name     | Required | Type      | Description                                                     |
| :------------ | :------- | :-------- | :-------------------------------------------------------------- |
| `title`       | No       | `string`  | The main heading.                                               |
| `description` | No       | `string`  | Subtitle text.                                                  |
| `headline`    | No       | `string`  | Small eyebrow text.                                             |
| `class`       | No       | `string`  | Tailwind classes for custom styling (e.g., `md:-mt-20`).        |
| `showViewAll` | No       | `boolean` | If `true`, show button "View All Sponsors". Default is `false`. |
| `viewAllLink` | No       | `string`  | The URL for the "View All" card.                                |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingSponsors
    title: Partners
    description: Thanks to our sponsors.
    headline: Sponsors
    showViewAll: true
    viewAllLink: /faq/sponsors
```
