# AppLandingGallery

## Description

A grid of images to showcase past events or the venue.

## Screenshot

![AppLandingGallery Screenshot](/docs/assets/landing-page-blocks/AppLandingGallery.png)

## Props

| Prop Name     | Required | Type                                               | Description                                              |
| :------------ | :------- | :------------------------------------------------- | :------------------------------------------------------- |
| `title`       | No       | `string`                                           | The main heading.                                        |
| `description` | No       | `string`                                           | Subtitle text.                                           |
| `headline`    | No       | `string`                                           | Small text above the title.                              |
| `class`       | No       | `string`                                           | Tailwind classes for custom styling (e.g., `md:-mt-20`). |
| `images`      | Yes      | [`ImageProps[]`](./property-presets/ImageProps.md) | List of images.                                          |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingGallery
    title: Past Event Highlights
    description: Check out some photos from our previous conferences.
    headline: Gallery
    images:
      - src: https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format
        alt: Conference Hall
      - src: https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&auto=format
        alt: Networking
      - src: https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=700&auto=format
        alt: Workshop
```
