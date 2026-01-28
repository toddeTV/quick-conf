# Landing Page Blocks

The landing page of Quick Conf is composed of modular blocks defined in `content/1.index.yml`. Each block corresponds to a Vue component in `app/components/app/landing/`.

> **Note**: The screenshots below demonstrate the layout structure. Colors, fonts, and spacing may vary depending on your project's global configuration and theme settings.

## Available Blocks

### AppLandingCta

A "Call to Action" section, typically used at the bottom of the page to encourage ticket sales.

```yaml
- component: AppLandingCta
  title: Ready to Join Us?
  description: Get your ticket now and secure your spot at the most anticipated event of the year.
  links:
    - label: Get Tickets
      to: /tickets
      icon: i-lucide-ticket
      size: xl
      color: primary
```

| Prop Name     | Required | Type            | Description                                                   |
| :------------ | :------- | :-------------- | :------------------------------------------------------------ |
| `title`       | No       | `string`        | The main heading of the section.                              |
| `description` | No       | `string`        | Subtitle text.                                                |
| `headline`    | No       | `string`        | Small text above the title.                                   |
| `links`       | No       | `ButtonProps[]` | Array of button objects (label, to, icon, color, size, etc.). |

![AppLandingCta Screenshot](/docs/assets/landing-page-blocks/AppLandingCta.png)

### AppLandingFaqPreview

A preview section for Frequently Asked Questions.

```yaml
- component: AppLandingFaqPreview
  title: FAQ
  description: Answers to common questions.
  headline: Need Help?
  link:
    label: View all FAQs
    to: /faq
    color: gray
    variant: ghost
  items:
    - label: What is the refund policy?
      content: You can get a full refund up to 30 days before the event.
    - label: Is there parking available?
      content: Yes, we have a dedicated parking lot for attendees.
```

| Prop Name     | Required | Type          | Description                                                                 |
| :------------ | :------- | :------------ | :-------------------------------------------------------------------------- |
| `items`       | Yes      | `object[]`    | List of FAQ items. Each item needs `label` (string) and `content` (string). |
| `title`       | No       | `string`      | The main heading.                                                           |
| `description` | No       | `string`      | Subtitle text.                                                              |
| `headline`    | No       | `string`      | Small text above the title.                                                 |
| `link`        | No       | `ButtonProps` | A generic link button, usually pointing to the full FAQ page.               |

![AppLandingFaqPreview Screenshot](/docs/assets/landing-page-blocks/AppLandingFaqPreview.png)

### AppLandingFeatures

A generic feature grid to highlight key aspects of your conference.

```yaml
- component: AppLandingFeatures
  title: Why Attend?
  description: Discover what makes this conference unique.
  headline: Features
  items:
    - title: Expert Speakers
      description: Learn from industry leaders.
      icon: i-lucide-mic
    - title: Networking
      description: Connect with 500+ peers.
      icon: i-lucide-users
    - title: Workshops
      description: Hands-on sessions to improved skills.
      icon: i-lucide-wrench
```

| Prop Name     | Required | Type       | Description                                                           |
| :------------ | :------- | :--------- | :-------------------------------------------------------------------- |
| `items`       | Yes      | `object[]` | List of features. Each item takes `title`, `description`, and `icon`. |
| `title`       | No       | `string`   | The main heading.                                                     |
| `description` | No       | `string`   | Subtitle text.                                                        |
| `headline`    | No       | `string`   | Small text above the title.                                           |

![AppLandingFeatures Screenshot](/docs/assets/landing-page-blocks/AppLandingFeatures.png)

### AppLandingGallery

A grid of images to showcase past events or the venue.

```yaml
- component: AppLandingGallery
  title: Gallery
  description: Highlights from last year.
  headline: Memories
  images:
    - src: /images/gallery/1.jpg
      alt: Conference Hall
    - src: /images/gallery/2.jpg
      alt: Networking Session
    - src: /images/gallery/3.jpg
      alt: Keynote Speech
```

| Prop Name     | Required | Type       | Description                                                                   |
| :------------ | :------- | :--------- | :---------------------------------------------------------------------------- |
| `images`      | Yes      | `object[]` | List of images. Each object needs `src` (string) and optional `alt` (string). |
| `title`       | No       | `string`   | The main heading.                                                             |
| `description` | No       | `string`   | Subtitle text.                                                                |
| `headline`    | No       | `string`   | Small text above the title.                                                   |

![AppLandingGallery Screenshot](/docs/assets/landing-page-blocks/AppLandingGallery.png)

### AppLandingHero

The standard hero section with title, description, and action buttons.

```yaml
- component: AppLandingHero
  title: The Tech Conference of 2026
  description: Join us for 3 days of inspiring talks and workshops.
  headline: October 15-17
  links:
    - label: Buy Tickets
      to: /tickets
      icon: i-lucide-ticket
      size: xl
    - label: Schedule
      to: /schedule
      color: gray
      variant: ghost
      size: xl
```

| Prop Name     | Required | Type            | Description                           |
| :------------ | :------- | :-------------- | :------------------------------------ |
| `title`       | No       | `string`        | The main heading of the hero.         |
| `description` | No       | `string`        | Subtext explaining the event.         |
| `headline`    | No       | `string`        | Small eyebrow text.                   |
| `links`       | No       | `ButtonProps[]` | Array of buttons for call-to-actions. |

![AppLandingHero Screenshot](/docs/assets/landing-page-blocks/AppLandingHero.png)

### AppLandingHeroCountdown

A hero variant that features a countdown timer to a specific date.

```yaml
- component: AppLandingHeroCountdown
  title: The Countdown Begins
  description: Don't miss out on the early bird tickets.
  targetDate: 2026-10-15T09:00:00.000Z
  links:
    - label: Register Now
      to: /tickets
      size: xl
```

| Prop Name     | Required | Type            | Description                                             |
| :------------ | :------- | :-------------- | :------------------------------------------------------ |
| `targetDate`  | Yes      | `string`        | ISO date string or UTC string for the countdown target. |
| `title`       | No       | `string`        | The main heading.                                       |
| `description` | No       | `string`        | Subtitle text.                                          |
| `headline`    | No       | `string`        | Small eyebrow text.                                     |
| `links`       | No       | `ButtonProps[]` | Array of buttons.                                       |

![AppLandingHeroCountdown Screenshot](/docs/assets/landing-page-blocks/AppLandingHeroCountdown.png)

### AppLandingHeroMedia

A rich hero section with support for a large image or video alongside the text.

```yaml
- component: AppLandingHeroMedia
  title: Experience the Future
  description: Watch the recap video from our last event.
  image:
    src: /images/hero-bg.jpg
    alt: Event Crowd
  # Optional: Use video instead of image
  # video:
  #   src: /videos/intro.mp4
  #   poster: /images/video-poster.jpg
  links:
    - label: Watch Full Video
      to: https://youtube.com
      target: _blank
      color: gray
```

| Prop Name        | Required | Type            | Description                                              |
| :--------------- | :------- | :-------------- | :------------------------------------------------------- |
| `title`          | No       | `string`        | The main heading.                                        |
| `description`    | No       | `string`        | Subtitle text.                                           |
| `headline`       | No       | `string`        | Small eyebrow text.                                      |
| `links`          | No       | `ButtonProps[]` | Array of buttons.                                        |
| `image`          | No       | `object`        | Main hero image ({`src`, `alt`}).                        |
| `video`          | No       | `object`        | Optional video ({`src`, `poster`}) to replace the image. |
| `overlayOpacity` | No       | `number`        | Opacity of the overlay on the media (0 to 1).            |

![AppLandingHeroMedia Screenshot](/docs/assets/landing-page-blocks/AppLandingHeroMedia.png)

### AppLandingMarquee

A scrolling marquee of logos or images.

```yaml
- component: AppLandingMarquee
  speed: 30
  direction: left
  gap: 50
  images:
    - src: /images/partners/logo1.svg
    - src: /images/partners/logo2.svg
    - src: /images/partners/logo3.svg
    - src: /images/partners/logo4.svg
```

| Prop Name   | Required | Type       | Description                                  |
| :---------- | :------- | :--------- | :------------------------------------------- |
| `images`    | Yes      | `object[]` | List of logo images ({`src`, `alt`}).        |
| `speed`     | No       | `number`   | Animation duration in seconds (default: 20). |
| `direction` | No       | `string`   | 'left' or 'right' (default: 'left').         |
| `gap`       | No       | `number`   | Gap between images in px (default: 0).       |

![AppLandingMarquee Screenshot](/docs/assets/landing-page-blocks/AppLandingMarquee.png)

### AppLandingMetaInfo

A horizontal bar displaying key event information like date, location, and stats.

```yaml
- component: AppLandingMetaInfo
  items:
    - icon: i-lucide-calendar
      label: Date
      text: Oct 15-17
    - icon: i-lucide-map-pin
      label: Location
      text: Amsterdam
    - icon: i-lucide-users
      label: Capacity
      text: 500+
```

| Prop Name     | Required | Type       | Description                                                     |
| :------------ | :------- | :--------- | :-------------------------------------------------------------- |
| `items`       | Yes      | `object[]` | List of items. Each needs `icon`, `text`, and optional `label`. |
| `title`       | No       | `string`   | Optional section title (rarely used).                           |
| `description` | No       | `string`   | Optional description.                                           |

![AppLandingMetaInfo Screenshot](/docs/assets/landing-page-blocks/AppLandingMetaInfo.png)

### AppLandingSection

A versatile section for text and an image, supporting split layouts.

```yaml
- component: AppLandingSection
  title: About the Venue
  description: We are hosted at the historic Grand Hall.
  orientation: horizontal
  reverse: false # Set true to put image on the left/right depending on locale
  image:
    src: /images/venue.jpg
    alt: Grand Hall
  features:
    - title: Central Location
      description: Easy access by public transport.
      icon: i-lucide-map
    - title: Great Food
      description: Catering included.
      icon: i-lucide-coffee
```

| Prop Name     | Required | Type       | Description                                                         |
| :------------ | :------- | :--------- | :------------------------------------------------------------------ |
| `title`       | No       | `string`   | The main heading.                                                   |
| `description` | No       | `string`   | Subtitle text.                                                      |
| `headline`    | No       | `string`   | Small eyebrow text.                                                 |
| `orientation` | No       | `string`   | 'horizontal' or 'vertical'.                                         |
| `reverse`     | No       | `boolean`  | If true, flips the image/text order.                                |
| `image`       | No       | `object`   | The main image ({`src`, `alt`}).                                    |
| `features`    | No       | `object[]` | Optional list of feature points ({`title`, `description`, `icon`}). |

![AppLandingSection Screenshot](/docs/assets/landing-page-blocks/AppLandingSection.png)

### AppLandingSeparator

A simple visual separator line.

```yaml
- component: AppLandingSeparator
```

| Prop Name | Required | Type     | Description                                     |
| :-------- | :------- | :------- | :---------------------------------------------- |
| `label`   | No       | `string` | Optional text label in the middle.              |
| `icon`    | No       | `string` | Optional icon in the middle.                    |
| `avatar`  | No       | `object` | Optional avatar in the middle ({`src`, `alt`}). |

![AppLandingSeparator Screenshot](/docs/assets/landing-page-blocks/AppLandingSeparator.png)

### AppLandingSpeakers

Displays a selection of speakers. Data is automatically fetched from the `speakers` content collection.

```yaml
- component: AppLandingSpeakers
  title: Meet the Experts
  description: Learn from the best in the industry.
  headline: Speakers
```

| Prop Name     | Required | Type     | Description         |
| :------------ | :------- | :------- | :------------------ |
| `title`       | No       | `string` | The main heading.   |
| `description` | No       | `string` | Subtitle text.      |
| `headline`    | No       | `string` | Small eyebrow text. |

![AppLandingSpeakers Screenshot](/docs/assets/landing-page-blocks/AppLandingSpeakers.png)

### AppLandingSponsors

Displays a grid of sponsors. Data is automatically fetched from the `sponsors` content collection.

```yaml
- component: AppLandingSponsors
  title: Our Partners
  description: Thank you to our amazing sponsors.
  showViewAll: true
  viewAllLink: /faq/sponsoring
```

| Prop Name     | Required | Type      | Description                                    |
| :------------ | :------- | :-------- | :--------------------------------------------- |
| `title`       | No       | `string`  | The main heading.                              |
| `description` | No       | `string`  | Subtitle text.                                 |
| `headline`    | No       | `string`  | Small eyebrow text.                            |
| `showViewAll` | No       | `boolean` | If true, shows a card linking to all sponsors. |
| `viewAllLink` | No       | `string`  | The URL for the "View All" card.               |

![AppLandingSponsors Screenshot](/docs/assets/landing-page-blocks/AppLandingSponsors.png)

### AppLandingTestimonials

Displays user testimonials in a grid.

```yaml
- component: AppLandingTestimonials
  title: What People Say
  description: Hear from past attendees.
  items:
    - quote: "The best conference I've ever attended!"
      user:
        name: Jane Doe
        description: Developer at TechCorp
        avatar:
          src: /images/avatars/jane.jpg
    - quote: Incredible atmosphere and great talks.
      user:
        name: John Smith
        description: Freelancer
        avatar:
          src: /images/avatars/john.jpg
```

| Prop Name     | Required | Type       | Description                                                                |
| :------------ | :------- | :--------- | :------------------------------------------------------------------------- |
| `items`       | Yes      | `object[]` | List of testimonials ({`quote`, `user: {name, description, avatar, to}`}). |
| `title`       | No       | `string`   | The main heading.                                                          |
| `description` | No       | `string`   | Subtitle text.                                                             |
| `headline`    | No       | `string`   | Small eyebrow text.                                                        |

![AppLandingTestimonials Screenshot](/docs/assets/landing-page-blocks/AppLandingTestimonials.png)
