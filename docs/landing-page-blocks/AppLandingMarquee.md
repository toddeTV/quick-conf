# AppLandingMarquee

## Description

A scrolling marquee of logos or images.

## Screenshot

![AppLandingMarquee Screenshot](/docs/assets/landing-page-blocks/AppLandingMarquee.png)

## Props

| Prop Name   | Required | Type                                               | Description                                              |
| :---------- | :------- | :------------------------------------------------- | :------------------------------------------------------- |
| `class`     | No       | `string`                                           | Tailwind classes for custom styling (e.g., `md:-mt-20`). |
| `speed`     | No       | `number`                                           | Animation duration in seconds (default: 20).             |
| `direction` | No       | `string`                                           | `left` or `right` (default: `left`).                     |
| `gap`       | No       | `number`                                           | Gap between images in px (default: 0).                   |
| `images`    | Yes      | [`ImageProps[]`](./property-presets/ImageProps.md) | List of logo images.                                     |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingMarquee
    direction: left
    speed: 40
    gap: 30
    images:
      - src: https://images.unsplash.com/photo-1587825...
        alt: Speaker
      - src: https://images.unsplash.com/photo-1529070...
        alt: Audience
      - src: https://images.unsplash.com/photo-1540575...
        alt: Hall
      - src: https://images.unsplash.com/photo-1515187...
        alt: Networking
      - src: https://images.unsplash.com/photo-1591115...
        alt: Workshop
```
