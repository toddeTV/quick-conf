# ButtonProps

Common properties for buttons and links used within blocks.

```yaml
link:
  label: Get Tickets
  to: /tickets
  icon: i-lucide-ticket
  trailing: true
  color: primary
  variant: solid
  size: md
```

| Prop Name  | Required | Type      | Description                                                                                    |
| :--------- | :------- | :-------- | :--------------------------------------------------------------------------------------------- |
| `class`    | No       | `string`  | Tailwind classes for custom styling (e.g., `md:-mt-20`).                                       |
| `label`    | Yes      | `string`  | The text displayed on the button.                                                              |
| `to`       | Yes      | `string`  | The URL to link to. Internal links start with `/`, external links with `https://`.             |
| `target`   | No       | `string`  | The target attribute for the link (e.g., `_blank` to open in a new tab).                       |
| `icon`     | No       | `string`  | Icon name from the configured icon set (e.g., `i-lucide-home`).                                |
| `trailing` | No       | `boolean` | Whether to place the icon after the label (trailing) or before (leading). Defaults to `false`. |
| `color`    | No       | `string`  | Button color (e.g., `primary`, `white`, `gray`, `black`).                                      |
| `variant`  | No       | `string`  | Button style (`solid`, `outline`, `soft`, `ghost`, `link`, `subtle`).                          |
| `size`     | No       | `string`  | Button size (`xs`, `sm`, `md`, `lg`, `xl`).                                                    |
| `block`    | No       | `boolean` | Whether the button should take up the full width of its container.                             |
| `square`   | No       | `boolean` | Whether the button should be square (useful for icon-only buttons).                            |
| `disabled` | No       | `boolean` | Whether the button is disabled.                                                                |
| `ui`       | No       | `object`  | Custom UI overrides for the component slots.                                                   |
