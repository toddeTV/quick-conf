# AppLandingHeroMedia

## Description

A rich hero section with support for a large image or video alongside the text.

## Screenshot

![AppLandingHeroMedia Screenshot](/docs/assets/landing-page-blocks/AppLandingHeroMedia.png)

## Props

| Prop Name        | Required | Type                                                 | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------- | :--------------------------------------------------------------- |
| `title`          | No       | `string`                                             | The main heading.                                                |
| `description`    | No       | `string`                                             | Subtitle text.                                                   |
| `headline`       | No       | `string`                                             | Small eyebrow text.                                              |
| `class`          | No       | `string`                                             | Tailwind classes for custom styling (e.g., `md:-mt-20`).         |
| `links`          | No       | [`ButtonProps[]`](./property-presets/ButtonProps.md) | Array of buttons.                                                |
| `image`          | No       | [`ImageProps`](./property-presets/ImageProps.md)     | Main hero image.                                                 |
| `video`          | No       | `object`                                             | Optional video ({`src`, `poster`}) to replace the image.         |
| `overlayOpacity` | No       | `number`                                             | Opacity of the overlay on the media (`0` to `1`, default `0.5`). |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingHeroMedia
    title: Experience the Vibe
    description: Immerse yourself in the atmosphere of our previous events.
    headline: Atmosphere
    overlayOpacity: 0.4
    image:
      src: https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3
      alt: Event Crowd
    links:
      - label: Watch Highlights
        icon: i-lucide-play
        variant: solid
        size: lg
        to: https://youtube.com/...
```
