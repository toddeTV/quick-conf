# AppLandingFeatures

## Description

A generic feature grid to highlight key aspects of your conference.

## Screenshot

![AppLandingFeatures Screenshot](/docs/assets/landing-page-blocks/AppLandingFeatures.png)

## Props

| Prop Name     | Required | Type       | Description                                                           |
| :------------ | :------- | :--------- | :-------------------------------------------------------------------- |
| `title`       | No       | `string`   | The main heading.                                                     |
| `description` | No       | `string`   | Subtitle text.                                                        |
| `headline`    | No       | `string`   | Small text above the title.                                           |
| `class`       | No       | `string`   | Tailwind classes for custom styling (e.g., `md:-mt-20`).              |
| `items`       | Yes      | `object[]` | List of features. Each item takes `title`, `description`, and `icon`. |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingFeatures
    title: What to Expect at Our Conference
    description: Our event is packed with features designed to provide a comprehensive and enriching experience for all attendees.
    headline: Highlights
    items:
      - title: Keynote Speeches
        description: Get inspired by visionary leaders who are shaping the future of the industry.
        icon: i-lucide-mic
      - title: Technical Deep Dives
        description: Dive deep into complex topics with our in-depth technical sessions.
        icon: i-lucide-code
      - title: Panel Discussions
        description: Hear from a variety of experts as they discuss and debate important industry topics.
        icon: i-lucide-messages-square
      - title: Networking Lounges
        description: Relax and connect with other attendees in our dedicated networking areas.
        icon: i-lucide-coffee
      - title: Sponsor Booths
        description: Discover new products and services from our amazing sponsors.
        icon: i-lucide-store
      - title: After Party
        description: Unwind and socialize with fellow attendees at our official after-party.
        icon: i-lucide-party-popper
```
