# AppLandingMetaInfo

## Description

A horizontal bar displaying key event information like date, location, and stats.

## Screenshot

![AppLandingMetaInfo Screenshot](/docs/assets/landing-page-blocks/AppLandingMetaInfo.png)

## Props

| Prop Name     | Required | Type       | Description                                                     |
| :------------ | :------- | :--------- | :-------------------------------------------------------------- |
| `title`       | No       | `string`   | Optional section title (rarely used).                           |
| `description` | No       | `string`   | Optional description.                                           |
| `headline`    | No       | `string`   | Small eyebrow text.                                             |
| `class`       | No       | `string`   | Tailwind classes for custom styling (e.g., `md:-mt-20`).        |
| `height`      | No       | `string`   | Section size: `normal` (default) or `small`.                    |
| `items`       | Yes      | `object[]` | List of items. Each needs `icon`, `text`, and optional `label`. |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingMetaInfo
    title: Event Details
    description: Key information about the upcoming conference.
    headline: At a Glance
    items:
      - icon: i-lucide-calendar
        text: October 15-17, 2026
        label: Date
      - icon: i-lucide-map-pin
        text: Amsterdam, NL
        label: Location
      - icon: i-lucide-users
        text: 500+ Attendees
        label: Capacity
      - icon: i-lucide-mic-2
        text: 30+ Speakers
        label: Content
```
