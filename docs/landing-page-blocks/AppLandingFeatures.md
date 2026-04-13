# AppLandingFeatures

## Description

A generic feature grid to highlight key aspects of your conference.

## Screenshot

![AppLandingFeatures Screenshot](/docs/assets/landing-page-blocks/AppLandingFeatures.png)

## Props

| Prop Name     | Required | Type       | Description                                                           |
| :------------ | :------- | :--------- | :-------------------------------------------------------------------- |
| `title`       | No       | `string`   | The main heading.                                                     |
| `description` | No       | `string`   | Subtitle text.                                                        |
| `headline`    | No       | `string`   | Small text above the title.                                           |
| `class`       | No       | `string`   | Tailwind classes for custom styling (e.g., `md:-mt-20`).              |
| `items`       | Yes      | `object[]` | List of features. Each item takes `title`, `description`, and `icon`. |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingFeatures
    title: What to Expect
    description: Comprehensive experience for all.
    headline: Highlights
    items:
      - title: Keynotes
        description: Visionary leaders shaping the future.
        icon: lucide:mic
      - title: Tech Deep Dives
        description: In-depth technical sessions.
        icon: lucide:code
      - title: Panels
        description: Experts debating industry topics.
        icon: lucide:messages-square
      - title: Networking
        description: Connect with other attendees.
        icon: lucide:coffee
      - title: Sponsors
        description: Discover new products.
        icon: lucide:store
      - title: After Party
        description: Socialize with attendees.
        icon: lucide:party-popper
```
