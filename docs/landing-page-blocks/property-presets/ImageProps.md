# ImageProps

Common properties for images used within blocks.

```yaml
image:
  src: https://images.unsplash.com/photo-1540575467063-178a50c2df87
  alt: Conference Hall
```

| Prop Name | Required | Type              | Description                                                          |
| :-------- | :------- | :---------------- | :------------------------------------------------------------------- |
| `src`     | Yes      | `string`          | The source URL of the image.                                         |
| `alt`     | No       | `string`          | Alternative text for the image (for accessibility).                  |
| `loading` | No       | `eager` or `lazy` | Image loading strategy. Default is `lazy`.                           |
| `sizes`   | No       | `string`          | Image sizes for responsive serving (e.g., `100vw sm:50vw md:400px`). |
