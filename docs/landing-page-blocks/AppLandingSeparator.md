# AppLandingSeparator

## Description

A simple visual separator line.

## Screenshot

![AppLandingSeparator Screenshot](/docs/assets/landing-page-blocks/AppLandingSeparator.png)

## Props

| Prop Name | Required | Type                                             | Description                                              |
| :-------- | :------- | :----------------------------------------------- | :------------------------------------------------------- |
| `class`   | No       | `string`                                         | Tailwind classes for custom styling (e.g., `md:-mt-20`). |
| `label`   | No       | `string`                                         | Optional text label in the middle.                       |
| `icon`    | No       | `string`                                         | Optional icon in the middle.                             |
| `avatar`  | No       | [`ImageProps`](./property-presets/ImageProps.md) | Optional avatar in the middle.                           |

## Example

```yaml
blocks:
  - [...]

  - component: AppLandingSeparator
```
