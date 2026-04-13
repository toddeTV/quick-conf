# AppLandingHeroSplit

## Description

A split-view hero section with content on the left and media (Video or Image) on the right. Ideally used for a layout where you want to show a video introduction or a hero image alongside the call to action.

## Screenshot

![AppLandingHeroSplit Screenshot](/docs/assets/landing-page-blocks/AppLandingHeroSplit.png)

## Props

| Prop Name     | Required | Type                                                 | Description                                                                                                                                                  |
| :------------ | :------- | :--------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | No       | `string`                                             | The main heading of the hero.                                                                                                                                |
| `description` | No       | `string`                                             | Subtext explaining the event.                                                                                                                                |
| `headline`    | No       | `string`                                             | Small eyebrow text.                                                                                                                                          |
| `class`       | No       | `string`                                             | Tailwind classes for custom styling.                                                                                                                         |
| `links`       | No       | [`ButtonProps[]`](./property-presets/ButtonProps.md) | Array of buttons for call-to-actions.                                                                                                                        |
| `image`       | No       | [`ImageProps`](./property-presets/ImageProps.md)     | The image object to display if no video is provided.                                                                                                         |
| `videoUrl`    | No       | `string`                                             | The YouTube Video URL. If provided, it overrides the image and displays a privacy-friendly YouTube Player. Supports `watch?v=`, `youtu.be/` and embed links. |
| `features`    | No       | `object[]`                                           | Array of feature items displayed below the action links. Each item accepts `title`, `description` (optional), and `icon` (optional).                         |

## Example

```yaml
blocks:
  - [...]

  # with Image:

  - component: AppLandingHeroSplit
    title: Welcome to Amsterdam
    description: The venue is amazing.
    headline: Location
    image:
      src: /images/venue.jpg
      alt: Conference Venue
    links:
      - label: Get Directions
        to: /location

  # with Video:

  - component: AppLandingHeroSplit
    title: Watch Keynote
    description: See what happened last year.
    headline: Recap
    videoUrl: https://www.youtube.com/watch?v=dQw4w9WgXcQ
    links:
      - label: Buy Ticket
        icon: lucide:ticket
        size: xl
        to: /tickets
```
