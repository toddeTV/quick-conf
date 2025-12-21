# Landing Page Blocks

The landing page is built using a modular block system. You can customize the layout by adding, removing, or reordering blocks in `content/0.index.yml`. Each block is a Vue component that receives its content via properties.

## Available Blocks

### `AppLandingHero`

The main hero section of the page with background effects.

- `title`: Main heading.
- `description`: Subtext.
- `links`: A list of buttons. Each button includes:
  - `label`: The text on the button.
  - `to`: The link destination.
  - `icon`: An optional icon name.
  - `color`: Button color (e.g., `primary`, `white`).
  - `variant`: Button style (e.g., `solid`, `outline`).
  - `size`: Button size (e.g., `md`, `lg`).

### `AppLandingSection`

A generic content section with an image and optional features.

- `title`: Section heading.
- `description`: Section text.
- `headline`: Small text above the title.
- `orientation`: `horizontal` or `vertical`.
- `reverse`: Boolean to flip image and text.
- `image`: The section image:
  - `src`: Image path.
  - `alt`: Description of the image.
- `features`: A list of highlights. Each highlight includes:
  - `title`: Feature heading.
  - `description`: Feature text.
  - `icon`: Feature icon.

### `AppLandingFeatures`

A grid of feature cards to showcase event highlights.

- `title`: Section heading.
- `description`: Section text.
- `headline`: Small text above the title.
- `items`: A list of features. Each feature includes:
  - `title`: Feature heading.
  - `description`: Feature text.
  - `icon`: Feature icon.

### `AppLandingSpeakers`

Displays featured speakers automatically fetched from the `speakers` collection.

- `title`: Section heading.
- `description`: Section text.
- `headline`: Small text above the title.

### `AppLandingTestimonials`

A grid of attendee testimonials.

- `title`: Section heading.
- `description`: Section text.
- `headline`: Small text above the title.
- `items`: A list of testimonials. Each testimonial includes:
  - `quote`: The testimonial text.
  - `user`: Information about the person:
    - `name`: Their name.
    - `description`: Their role or company.
    - `to`: Link to their profile or website.
    - `avatar`: Their profile picture:
      - `src`: Image path.
      - `alt`: Description of the image.

### `AppLandingSponsors`

A grid of sponsor logos automatically fetched from the `sponsors` collection.

- `title`: Section heading.
- `description`: Section text.
- `headline`: Small text above the title.
- `showViewAll`: Boolean to show a "View All Sponsors" button.
- `viewAllLink`: The link for the "View All" button (defaults to `/faq/sponsors`).

### `AppLandingCta`

A call-to-action section with background effects, typically used at the bottom of the page.

- `title`: CTA heading.
- `description`: CTA text.
- `links`: A list of buttons. Each button includes:
  - `label`: The text on the button.
  - `to`: The link destination.
  - `icon`: An optional icon name.
  - `color`: Button color (e.g., `primary`, `white`).
  - `variant`: Button style (e.g., `solid`, `outline`).
  - `size`: Button size (e.g., `md`, `lg`).
