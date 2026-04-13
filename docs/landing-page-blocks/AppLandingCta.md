# AppLandingCta

## Description

A "Call to Action" section, typically used at the bottom of the page to encourage ticket sales.

## Screenshot

![AppLandingCta Screenshot](/docs/assets/landing-page-blocks/AppLandingCta.png)

## Props

| Prop Name     | Required | Type                                                 | Description                                                   |
| :------------ | :------- | :--------------------------------------------------- | :------------------------------------------------------------ |
| `title`       | No       | `string`                                             | The main heading of the section.                              |
| `description` | No       | `string`                                             | Subtitle text.                                                |
| `class`       | No       | `string`                                             | Tailwind classes for custom styling (e.g., `md:-mt-20`).      |
| `links`       | No       | [`ButtonProps[]`](./property-presets/ButtonProps.md) | Array of button objects (label, to, icon, color, size, etc.). |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingCta
    title: Join Us
    description: Get your ticket today!
    links:
      - label: Get Ticket
        variant: solid
        to: /tickets
        icon: lucide:ticket
        trailing: false
        size: xl
      - label: Apply as Speaker
        variant: subtle
        to: /faq/cfp
        icon: lucide:megaphone
        trailing: false
        size: xl
      - label: Sponsor Us
        variant: subtle
        to: /sponsors
        icon: lucide:heart
        trailing: false
        size: xl
```
