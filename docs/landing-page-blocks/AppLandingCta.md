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
    title: Ready to Join Us?
    description: Don't miss out on this opportunity to learn, network, and grow. Get your ticket today!
    links:
      - label: Get Your Ticket Now
        variant: solid
        to: /tickets
        icon: i-lucide-ticket
        trailing: false
        size: xl
      - label: Apply as Speaker
        variant: subtle
        to: /faq/cfp
        icon: i-lucide-megaphone
        trailing: false
        size: xl
      - label: Become a Sponsor
        variant: subtle
        to: /sponsors
        icon: i-lucide-heart
        trailing: false
        size: xl
```
