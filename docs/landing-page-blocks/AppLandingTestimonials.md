# AppLandingTestimonials

## Description

Displays user testimonials in a grid.

## Screenshot

![AppLandingTestimonials Screenshot](/docs/assets/landing-page-blocks/AppLandingTestimonials.png)

## Props

| Prop Name     | Required | Type       | Description                                                                                                                                               |
| :------------ | :------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | No       | `string`   | The main heading.                                                                                                                                         |
| `description` | No       | `string`   | Subtitle text.                                                                                                                                            |
| `headline`    | No       | `string`   | Small eyebrow text.                                                                                                                                       |
| `class`       | No       | `string`   | Tailwind classes for custom styling (e.g., `md:-mt-20`).                                                                                                  |
| `items`       | Yes      | `object[]` | List of testimonials ({`quote`, `user: {name, description, avatar, to, target}`}). The user avatar uses [`ImageProps`](./property-presets/ImageProps.md). |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingTestimonials
    title: Feedback
    description: Messages from attendees.
    headline: Testimonials
    items:
      - quote: Best conference ever!
        user:
          name: John Smith
          description: Freelancer
          to: https://x.com/user-example-42
          target: _blank
          avatar:
            src: https://i.pravatar.cc/120?img=1
            alt: Avatar
```
