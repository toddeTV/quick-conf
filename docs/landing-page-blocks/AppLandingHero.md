# AppLandingHero

## Description

The standard hero section with title, description, and action buttons.

## Screenshot

![AppLandingHero Screenshot](/docs/assets/landing-page-blocks/AppLandingHero.png)

## Props

| Prop Name     | Required | Type                                                 | Description                                              |
| :------------ | :------- | :--------------------------------------------------- | :------------------------------------------------------- |
| `title`       | No       | `string`                                             | The main heading of the hero.                            |
| `description` | No       | `string`                                             | Subtext explaining the event.                            |
| `headline`    | No       | `string`                                             | Small eyebrow text.                                      |
| `class`       | No       | `string`                                             | Tailwind classes for custom styling (e.g., `md:-mt-20`). |
| `links`       | No       | [`ButtonProps[]`](./property-presets/ButtonProps.md) | Array of buttons for call-to-actions.                    |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingHero
    title: Welcome to Conference
    description: Modern conference template with CMS.
    headline: Tech Summit
    links:
      - label: Buy Ticket
        icon: lucide:ticket
        trailing: false
        color: primary
        variant: solid
        size: xl
        to: /tickets
      - label: View Schedule
        icon: lucide:calendar
        trailing: false
        color: neutral
        variant: subtle
        size: xl
        to: /schedule
```
