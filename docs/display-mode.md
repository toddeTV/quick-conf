# Display Mode

The display route is designed for venue screens and signage.

## Open the Page

- Route: `/display`
- Quick access: footer icon button in the bottom-right action group.

## What It Supports

1. One slide-in settings panel with live preview updates.
1. Shareable URL query parameters so copied links restore the same setup.
1. Copy-to-clipboard action for the full generated display URL.
1. Three display modes:
   - `timetable`: full schedule grid view.
     - Typical placement: central info screens, registration area, or lounge overview screens.
   - `all-details`: all stages with one main card and configurable upcoming cards.
     - Typical placement: hallways, foyers, and other public circulation areas.
   - `stage-details`: one stage with one main card and configurable upcoming cards.
     - Typical placement: room entrances, in-room side screens, and near the stage itself.
1. Info boxes position control:
   - `Right side`
   - `Bottom row`
1. Stage selection and day mode selection (`auto` or `manual`).
1. Sponsor controls (`off`, `all`, `rotate`) and sponsor logo column control.
1. QR block linking to `/schedule` with configurable QR style.
1. Optional color mode override (`site`, `light`, `dark`).
1. Data refresh interval (`60`, `120`, `300` seconds).
1. Next-talk count and next-talk layout (`row` or `column`).
1. Grid columns (`0` for auto, `999` for one row).
1. Header with clock above date for fast time visibility.

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
