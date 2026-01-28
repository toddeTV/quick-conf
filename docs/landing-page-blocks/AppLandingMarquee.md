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
      - src: https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=700&auto=format
        alt: Speaker presenting on the main stage
      - src: https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=700&auto=format
        alt: Large audience attending a keynote session
      - src: https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format
        alt: Wide view of the conference hall crowd
      - src: https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format
        alt: Attendees networking during the coffee break
      - src: https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&auto=format
        alt: Focused view of a speaker during a workshop session
```
