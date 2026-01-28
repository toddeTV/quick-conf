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
    title: Discover a World of Innovation
    description: Join us for an unforgettable experience where industry leaders, experts, and enthusiasts come together to share their knowledge and passion. Explore the latest trends and network with peers.
    headline: Innovation
    orientation: horizontal
    features:
      - title: Expert Speakers
        description: Learn from the best in the industry with a lineup of world-class speakers.
        icon: i-lucide-users
      - title: Networking Opportunities
        description: Connect with fellow attendees, speakers, and sponsors to build valuable relationships.
        icon: i-lucide-contact
      - title: Hands-on Workshops
        description: Participate in interactive workshops to gain practical skills and knowledge.
        icon: i-lucide-wrench
    image:
      src: https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=700&auto=format
      alt: A speaker presenting on a stage at a conference.
```
