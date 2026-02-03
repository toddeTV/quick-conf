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
    title: Details
    description: Key info.
    headline: Overview
    items:
      - icon: i-lucide-calendar
        text: Oct 15-17
        label: Date
      - icon: i-lucide-map-pin
        text: Amsterdam
        label: Location
      - icon: i-lucide-users
        text: 500+
        label: Capacity
      - icon: i-lucide-mic-2
        text: 30+ Speakers
        label: Content
```
