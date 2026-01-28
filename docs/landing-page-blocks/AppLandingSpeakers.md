# AppLandingSpeakers

## Description

Displays a selection of speakers. Data is automatically fetched from the `speakers` content collection.

## Screenshot

![AppLandingSpeakers Screenshot](/docs/assets/landing-page-blocks/AppLandingSpeakers.png)

## Props

| Prop Name     | Required | Type     | Description                                              |
| :------------ | :------- | :------- | :------------------------------------------------------- |
| `title`       | No       | `string` | The main heading.                                        |
| `description` | No       | `string` | Subtitle text.                                           |
| `headline`    | No       | `string` | Small eyebrow text.                                      |
| `class`       | No       | `string` | Tailwind classes for custom styling (e.g., `md:-mt-20`). |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingSpeakers
    title: Meet the Experts
    description: We are excited to present a lineup of distinguished speakers who are experts in their fields.
    headline: Featured Speakers
```
