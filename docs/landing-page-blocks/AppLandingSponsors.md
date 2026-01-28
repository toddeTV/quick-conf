# AppLandingSponsors

Displays a grid of sponsors. Data is automatically fetched from the `sponsors` content collection.

```yaml
blocks:
  - [...]

  - component: AppLandingSponsors
    title: Our Partners
    description: Thank you to our amazing sponsors.
    headline: Meet Our Sponsors
    showViewAll: true
    viewAllLink: /faq/sponsors
```

| Prop Name     | Required | Type      | Description                                                                   |
| :------------ | :------- | :-------- | :---------------------------------------------------------------------------- |
| `title`       | No       | `string`  | The main heading.                                                             |
| `description` | No       | `string`  | Subtitle text.                                                                |
| `headline`    | No       | `string`  | Small eyebrow text.                                                           |
| `class`       | No       | `string`  | Tailwind classes for custom styling (e.g., `md:-mt-20`).                      |
| `showViewAll` | No       | `boolean` | If true, show all sponsors. If `false`, shows a card linking to all sponsors. |
| `viewAllLink` | No       | `string`  | The URL for the "View All" card.                                              |

![AppLandingSponsors Screenshot](/docs/assets/landing-page-blocks/AppLandingSponsors.png)
