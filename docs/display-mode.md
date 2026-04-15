# Display Mode

The display route is designed for venue screens and signage.

## Open the Page

- Route: `/display`
- Quick access: footer icon button in the bottom-right action group.

## Core Usage

1. Open `/display`.
1. Click the settings button in the top bar on the right.
1. Configure mode, info box position, stage/day selection, sponsor behavior, scale, refresh interval, next talks, grid columns, and more.
1. Copy the generated URL from the settings panel and open it on the target screen.

### Modes

- `all-details` (default): all stages with one main card and configurable upcoming cards.
- `stage-details`: one stage with one main card and configurable upcoming cards.
- `timetable`: full schedule grid view (timetable like on the user facing schedule sub-page, but wrapped for venue displaying).

## URL Settings

The page persists settings in query parameters so a copied link restores the same state.

Unsupported query parameters are ignored automatically, and the UI shows an error toast for each unsupported parameter.

Example:

```text
/display?mode=stage-details&stage=main-stage&sponsors=rotate&sponsorCols=2&nextLayout=column&scale=1.20&refresh=120
```

## Header

- The top bar always shows date and time together on two lines.

## Operational Note

Use refresh presets (`60`, `120`, `300` seconds) for background data updates without page reload. With this, the displayed data stays live with a small delay.
