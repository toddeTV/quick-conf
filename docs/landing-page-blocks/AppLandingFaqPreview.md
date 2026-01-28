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
    title: Frequently Asked Questions
    description: Answers to common questions.
    headline: Need Help?
    link:
      label: View All FAQs
      to: /faq
      color: neutral
      variant: outline
    items:
      - label: What is the refund policy?
        content: You can get a full refund up to 30 days before the event.
      - label: Is there a code of conduct?
        content: Yes, we have a strict code of conduct that all attendees must adhere to.
      - label: Are meals included?
        content: Yes, breakfast and lunch are provided on all conference days.
```
