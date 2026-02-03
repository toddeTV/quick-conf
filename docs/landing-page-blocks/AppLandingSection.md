# AppLandingSection

## Description

A versatile section for text and an image, supporting split layouts.

## Screenshot

![AppLandingSection Screenshot](/docs/assets/landing-page-blocks/AppLandingSection.png)

## Props

| Prop Name     | Required | Type                                             | Description                                                         |
| :------------ | :------- | :----------------------------------------------- | :------------------------------------------------------------------ |
| `title`       | No       | `string`                                         | The main heading.                                                   |
| `description` | No       | `string`                                         | Subtitle text.                                                      |
| `headline`    | No       | `string`                                         | Small eyebrow text.                                                 |
| `class`       | No       | `string`                                         | Tailwind classes for custom styling (e.g., `md:-mt-20`).            |
| `orientation` | No       | `string`                                         | `horizontal` or `vertical`.                                         |
| `reverse`     | No       | `boolean`                                        | If true, flips the image/text order.                                |
| `image`       | No       | [`ImageProps`](./property-presets/ImageProps.md) | The main image.                                                     |
| `features`    | No       | `object[]`                                       | Optional list of feature points ({`title`, `description`, `icon`}). |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingSection
    title: Innovation World
    description: Join us for an unforgettable experience.
    headline: Innovation
    orientation: horizontal
    features:
      - title: Experts
        description: Learn from best.
        icon: i-lucide-users
      - title: Networking
        description: Connect with peers.
        icon: i-lucide-contact
      - title: Workshops
        description: Gain practical skills.
        icon: i-lucide-wrench
    image:
      src: https://images.unsplash.com/photo-1587825...
      alt: Speaker on stage
```
