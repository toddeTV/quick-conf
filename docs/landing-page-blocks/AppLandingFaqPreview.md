# AppLandingFaqPreview

## Description

A preview section for Frequently Asked Questions.

## Screenshot

![AppLandingFaqPreview Screenshot](/docs/assets/landing-page-blocks/AppLandingFaqPreview.png)

## Props

| Prop Name     | Required | Type                                               | Description                                                                 |
| :------------ | :------- | :------------------------------------------------- | :-------------------------------------------------------------------------- |
| `title`       | No       | `string`                                           | The main heading.                                                           |
| `description` | No       | `string`                                           | Subtitle text.                                                              |
| `headline`    | No       | `string`                                           | Small text above the title.                                                 |
| `class`       | No       | `string`                                           | Tailwind classes for custom styling (e.g., `md:-mt-20`).                    |
| `items`       | Yes      | `object[]`                                         | List of FAQ items. Each item needs `label` (string) and `content` (string). |
| `link`        | No       | [`ButtonProps`](./property-presets/ButtonProps.md) | A generic link button, usually pointing to the full FAQ page.               |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingFaqPreview
    title: FAQ
    description: Common questions.
    headline: Help
    link:
      label: All FAQs
      to: /faq
      color: neutral
      variant: outline
    items:
      - label: Refund policy?
        content: Full refund up to 30 days before.
      - label: Code of conduct?
        content: Yes, strict code of conduct.
      - label: Meals included?
        content: Breakfast and lunch included.
```
