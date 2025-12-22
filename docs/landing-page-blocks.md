# Landing Page Blocks

The landing page is built using a modular block system. You can customize the layout by adding, removing, or reordering blocks in `content/0.index.yml`. Each block is a Vue component that receives its content via properties.

## Property Presets

### Base Object

All blocks support the following base properties:

- `title`: [optional] Heading.
- `description`: [optional] Subtext.
- `headline`: [optional] Small text above the title.
- `class`: [optional] Tailwind classes for custom styling (e.g., `md:-mt-20`).

#### Link Object & Button Object

Used for buttons and links.

- `label`: The text on the button.
- `to`: The link destination.
- `icon`: [optional] An icon name.
- `color`: [optional] Button color (e.g., `primary`, `white`).
- `variant`: [optional] Button style (e.g., `solid`, `outline`).
- `size`: [optional] Button size (e.g., `md`, `lg`).
- `trailing`: [optional] Whether the icon should be trailing.
- `target`: [optional] Link target (e.g., `_blank`).

#### Image Object

Used for images and avatars.

- `src`: Image path.
- `alt`: [optional] Description of the image.
- `loading`: [optional] Image loading strategy (`lazy` or `eager`).
- `srcset`: [optional] Image srcset.

## Available Blocks

### `AppLandingHero`

The main hero section of the page with background effects.

- Inherits base from **Base Object**.
- `links`: [optional] A list of **Link Objects**.

### `AppLandingSection`

A generic content section with an image and optional features.

- Inherits base from **Base Object**.
- `orientation`: [optional] `horizontal` or `vertical`.
- `reverse`: [optional] Boolean to flip image and text.
- `image`: [optional] An **Image Object**.
- `features`: [optional] A list of highlights. Each highlight includes:
  - `title`: Feature heading.
  - `description`: Feature text.
  - `icon`: Feature icon.
  - `headline`: [optional] Small text above the title.

### `AppLandingFeatures`

A grid of feature cards to showcase event highlights.

- Inherits base from **Base Object**.
- `items`: [optional] A list of features. Each feature includes:
  - `title`: Feature heading.
  - `description`: Feature text.
  - `icon`: Feature icon.
  - `headline`: [optional] Small text above the title.

### `AppLandingSpeakers`

Displays featured speakers automatically fetched from the `speakers` collection.

- Inherits base from **Base Object**.

### `AppLandingTestimonials`

A grid of attendee testimonials.

- Inherits base from **Base Object**.
- `items`: [optional] A list of testimonials. Each testimonial includes:
  - `quote`: The testimonial text.
  - `user`: Information about the person:
    - `name`: Their name.
    - `description`: Their role or company.
    - `to`: Link to their profile or website.
    - `target`: [optional] Link target (e.g., `_blank`).
    - `avatar`: An **Image Object**.

### `AppLandingSponsors`

A grid of sponsor logos automatically fetched from the `sponsors` collection.

- Inherits base from **Base Object**.
- `showViewAll`: [optional] Boolean to show a "View All Sponsors" button.
- `viewAllLink`: [optional] The link for the "View All" button (defaults to `/faq/sponsors`).

### `AppLandingCta`

A call-to-action section with background effects, typically used at the bottom of the page.

- Inherits base from **Base Object**.
- `links`: [optional] A list of **Link Objects**.

### `AppLandingHeroMedia`

A hero section with a full-width background image or video.

- Inherits base from **Base Object**.
- `links`: [optional] A list of **Link Objects**.
- `image`: [optional] Background **Image Object**.
- `video`: [optional] Background video (takes precedence over image).
  - `src`: Video path.
  - `poster`: [optional] Poster image path.
- `overlayOpacity`: [optional] Opacity of the black overlay (0-1, default: 0.5).

### `AppLandingHeroCountdown`

A hero section with a countdown timer.

- Inherits base from **Base Object**.
- `links`: [optional] A list of **Link Objects**.
- `targetDate`: The target date and time in ISO format (e.g., `2025-12-31T10:00:00Z`).

**Behavior:**

- **Counting Down**: Shows days, hours, minutes, and seconds until `targetDate`.
- **Live**: Shows "Live Now" for 12 hours after `targetDate` is reached.
- **Ended**: Shows "Event Ended" after the 12-hour live window.

### `AppLandingMetaInfo`

A block for displaying key meta-information (Date, Location, etc.) in a grid.

- Inherits base from **Base Object**.
- `items`: A list of info items. Each item includes:
  - `icon`: Icon name.
  - `text`: Main text.
  - `label`: [optional] Optional label above the text.

### `AppLandingMarquee`

An infinite scrolling bar of images (e.g., logos).

- Inherits base from **Base Object**.
- `direction`: [optional] Scroll direction (`left` or `right`).
- `speed`: [optional] Animation duration in seconds (default: 20).
- `gap`: [optional] Gap between images in pixels (default: 0).
- `images`: A list of **Image Objects**.

### `AppLandingGallery`

A grid of images to showcase past events or highlights.

- Inherits base from **Base Object**.
- `images`: A list of **Image Objects**.

### `AppLandingFaqPreview`

A preview of Frequently Asked Questions with an accordion layout.

- Inherits base from **Base Object**.
- `link`: [optional] Optional **Link Object** to view all FAQs.
- `items`: A list of FAQ items.
  - `label`: The question.
  - `content`: The answer.

### `AppLandingSeparator`

A simple separator line to visually divide sections.

- Inherits base from **Base Object**.
- `label`: [optional] Text in the middle of the separator.
- `icon`: [optional] Icon in the middle of the separator.
- `avatar`: [optional] **Image Object** in the middle of the separator.
