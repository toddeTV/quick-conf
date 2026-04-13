# AppLandingHeroCountdown

## Description

A hero variant that features a countdown timer to a specific date.

## Screenshot

### Countdown

![AppLandingHeroCountdown state "countdown" Screenshot](/docs/assets/landing-page-blocks/AppLandingHeroCountdown.png)

### Live Now for 12 hours from start

![AppLandingHeroCountdown state "live now" Screenshot](/docs/assets/landing-page-blocks/AppLandingHeroCountdown_liveNow.png)

### Event Ended after 12 hours after start

![AppLandingHeroCountdown state "event ended" Screenshot](/docs/assets/landing-page-blocks/AppLandingHeroCountdown_eventEnded.png)

## Props

| Prop Name     | Required | Type                                                 | Description                                              |
| :------------ | :------- | :--------------------------------------------------- | :------------------------------------------------------- |
| `title`       | No       | `string`                                             | The main heading.                                        |
| `description` | No       | `string`                                             | Subtitle text.                                           |
| `headline`    | No       | `string`                                             | Small eyebrow text.                                      |
| `class`       | No       | `string`                                             | Tailwind classes for custom styling (e.g., `md:-mt-20`). |
| `targetDate`  | Yes      | `string`                                             | ISO date string or UTC string for the countdown target.  |
| `links`       | No       | [`ButtonProps[]`](./property-presets/ButtonProps.md) | Array of buttons.                                        |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingHeroCountdown
    title: Launch Countdown
    description: Event coming soon.
    headline: Save Date
    targetDate: '2026-10-15T10:00:00Z'
    links:
      - label: Register
        icon: lucide:ticket
        variant: outline
        size: lg
        to: /tickets
```
