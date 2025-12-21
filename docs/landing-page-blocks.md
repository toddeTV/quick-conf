# Landing Page Blocks

The landing page is built using a modular block system. You can customize the layout by adding, removing, or reordering blocks in `content/0.index.yml`. Each block is a Vue component that receives its content via properties.

## Available Blocks

### Common Properties

All blocks support the following optional properties to control spacing:

- `class`: Tailwind classes for custom styling (e.g., `md:-mt-20`).

### `AppLandingHero`

The main hero section of the page with background effects.

- `title`: Main heading.
- `description`: Subtext.
- `headline`: Small text above the title.
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
  - `loading`: Image loading strategy (`lazy` or `eager`).
  - `srcset`: Image srcset.
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
    - `target`: Link target (e.g., `_blank`).
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
- `headline`: Small text above the title.
- `links`: A list of buttons. Each button includes:
  - `label`: The text on the button.
  - `to`: The link destination.
  - `icon`: An optional icon name.
  - `color`: Button color (e.g., `primary`, `white`).
  - `variant`: Button style (e.g., `solid`, `outline`).
  - `size`: Button size (e.g., `md`, `lg`).

### `AppLandingHeroMedia`

A hero section with a full-width background image or video.

- `title`: Main heading.
- `description`: Subtext.
- `headline`: Small text above the title.
- `links`: A list of buttons.
- `image`: Background image (optional).
  - `src`: Image path.
  - `alt`: Image description.
- `video`: Background video (optional, takes precedence over image).
  - `src`: Video path.
  - `poster`: Poster image path.
- `overlayOpacity`: Opacity of the black overlay (0-1, default: 0.5).

### `AppLandingHeroCountdown`

A hero section with a countdown timer.

- `title`: Main heading.
- `description`: Subtext.
- `headline`: Small text above the title.
- `links`: A list of buttons.
- `targetDate`: The target date and time in ISO format (e.g., `2025-12-31T10:00:00Z`).

**Behavior:**

- **Counting Down**: Shows days, hours, minutes, and seconds until `targetDate`.
- **Live**: Shows "Live Now" for 12 hours after `targetDate` is reached.
- **Ended**: Shows "Event Ended" after the 12-hour live window.

### `AppLandingMetaInfo`

A block for displaying key meta-information (Date, Location, etc.) in a grid.

- `items`: A list of info items. Each item includes:
  - `icon`: Icon name.
  - `text`: Main text.
  - `label`: Optional label above the text.

### `AppLandingMarquee`

An infinite scrolling bar of images (e.g., logos).

- `direction`: Scroll direction (`left` or `right`).
- `speed`: Animation duration in seconds (default: 20).
- `gap`: Gap between images in pixels (default: 0).
- `images`: A list of images.
  - `src`: Image path.
  - `alt`: Image description.

### `AppLandingGallery`

A grid of images to showcase past events or highlights.

- `title`: Section heading.
- `description`: Section text.
- `headline`: Small text above the title.
- `images`: A list of images.
  - `src`: Image path.
  - `alt`: Image description.

### `AppLandingFaqPreview`

A preview of Frequently Asked Questions with an accordion layout.

- `title`: Section heading.
- `description`: Section text.
- `headline`: Small text above the title.
- `link`: Optional button to view all FAQs.
- `items`: A list of FAQ items.
  - `label`: The question.
  - `content`: The answer.

### `AppLandingSeparator`

A simple separator line to visually divide sections.

- `label`: Optional text in the middle of the separator.
- `icon`: Optional icon in the middle of the separator.
- `avatar`: Optional avatar in the middle of the separator.
  - `src`: Image path.
  - `alt`: Image description.
