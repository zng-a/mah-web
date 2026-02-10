# Payload CMS Build Prompt

You are building a Payload CMS v3 (latest) instance for a mosque website called "Quwwat-ul-Islam Society". The CMS will serve as a headless backend, with the frontend consuming content via Payload's REST API.

## Tech Requirements

- Payload CMS v3 (latest stable)
- Database: PostgreSQL (or MongoDB — use whichever you prefer, but be consistent)
- Node.js 20+
- Use TypeScript throughout
- Use Payload's Lexical rich text editor (not Slate)
- Install and configure these Payload plugins:
  - `@payloadcms/plugin-seo` — for page-level SEO fields (meta title, description, OG image)
  - `@payloadcms/plugin-form-builder` — for contact forms, membership applications, etc.
  - `@payloadcms/richtext-lexical` — Lexical editor

---

## Collections

### 1. `pages`

The core collection. Every page on the site is a document here.

**Fields:**

```ts
{
  name: 'title',
  type: 'text',
  required: true,
}
```

```ts
{
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  admin: {
    position: 'sidebar',
  },
  hooks: {
    // Auto-generate from title if empty
    beforeValidate: [({ value, data }) => value || slugify(data.title)],
  },
}
```

```ts
{
  name: 'template',
  type: 'select',
  admin: {
    position: 'sidebar',
    description: 'Selecting a template pre-populates the layout with default blocks. You can rearrange or remove them after.',
  },
  options: [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Contact', value: 'contact' },
    { label: 'Services', value: 'services' },
    { label: 'Donate', value: 'donate' },
    { label: 'Events', value: 'events' },
    { label: 'News Listing', value: 'news-listing' },
    { label: 'General', value: 'general' },
  ],
  defaultValue: 'general',
}
```

```ts
{
  name: 'showDonateBar',
  type: 'checkbox',
  label: 'Show Donate Bar',
  defaultValue: false,
  admin: {
    position: 'sidebar',
    description: 'Display the hardcoded donate bar component on this page.',
  },
}
```

```ts
{
  name: 'donateBarPosition',
  type: 'select',
  label: 'Donate Bar Position',
  options: [
    { label: 'Below Hero (overlapping)', value: 'below-hero' },
    { label: 'Bottom of Page (above footer)', value: 'above-footer' },
  ],
  defaultValue: 'below-hero',
  admin: {
    position: 'sidebar',
    condition: (data) => data.showDonateBar,
  },
}
```

```ts
{
  name: 'layout',
  type: 'blocks',
  label: 'Page Layout',
  blocks: [
    HeroSlider,
    HeroSimple,
    RichTextBlock,
    SectionHeading,
    CardGrid,
    IconCardGrid,
    NewsFeature,
    TeamGrid,
    ContactSplit,
    MapEmbed,
    FormBlock,
    CTABanner,
    EventList,
    FaqAccordion,
    Spacer,
  ],
}
```

**Also apply the SEO plugin to this collection.**

---

### 2. `news`

```ts
fields: [
  { name: 'title', type: 'text', required: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
  { name: 'excerpt', type: 'textarea', maxLength: 200 },
  { name: 'content', type: 'richText' },  // Lexical
  { name: 'publishedDate', type: 'date', required: true, admin: { position: 'sidebar' } },
  { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Show as the large featured card' } },
  { name: 'status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft', admin: { position: 'sidebar' } },
]
```

Add `versions: { drafts: true }` for draft/publish workflow.

---

### 3. `events`

```ts
fields: [
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'richText' },
  { name: 'eventDate', type: 'date', required: true },
  { name: 'startTime', type: 'text', required: true },  // e.g. "7:00 PM"
  { name: 'endTime', type: 'text' },
  { name: 'location', type: 'text', defaultValue: 'Quwwat-ul-Islam Society' },
  { name: 'featuredImage', type: 'upload', relationTo: 'media' },
  { name: 'status', type: 'select', options: ['upcoming', 'completed', 'cancelled'], defaultValue: 'upcoming', admin: { position: 'sidebar' } },
]
```

---

### 4. `services`

```ts
fields: [
  { name: 'title', type: 'text', required: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'icon', type: 'upload', relationTo: 'media' },  // SVG or image icon
  { name: 'shortDescription', type: 'textarea', maxLength: 150 },
  { name: 'content', type: 'richText' },
  { name: 'featuredImage', type: 'upload', relationTo: 'media' },
  { name: 'order', type: 'number', admin: { position: 'sidebar' } },
]
```

---

### 5. `team-members`

```ts
fields: [
  { name: 'name', type: 'text', required: true },
  { name: 'role', type: 'text', required: true },  // e.g. "Chairman", "Imam", "Treasurer"
  { name: 'photo', type: 'upload', relationTo: 'media' },
  { name: 'bio', type: 'textarea' },
  { name: 'order', type: 'number', admin: { position: 'sidebar' } },
]
```

---

### 6. `media`

Use Payload's default media collection with these settings:

```ts
upload: {
  mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf'],
  imageSizes: [
    { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
    { name: 'card', width: 680, height: 280, position: 'centre' },
    { name: 'hero', width: 1920, height: 800, position: 'centre' },
  ],
}
```

Fields: `alt` (text, required for accessibility).

---

## Globals

### 1. `header`

```ts
fields: [
  {
    name: 'announcementBar',
    type: 'group',
    fields: [
      { name: 'enabled', type: 'checkbox', defaultValue: true },
      { name: 'message', type: 'text' },
      { name: 'linkText', type: 'text' },
      { name: 'linkUrl', type: 'text' },
    ],
  },
  {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'navLinks',
    type: 'array',
    fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'url', type: 'text' },
      { name: 'page', type: 'relationship', relationTo: 'pages' },  // Either url OR page
      { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
      {
        name: 'children',
        type: 'array',
        label: 'Dropdown Items',
        admin: { description: 'Leave empty for a simple link. Add items for a dropdown menu.' },
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'url', type: 'text' },
          { name: 'page', type: 'relationship', relationTo: 'pages' },
        ],
      },
    ],
  },
]
```

---

### 2. `footer`

```ts
fields: [
  {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'columns',
    type: 'array',
    maxRows: 5,
    fields: [
      { name: 'heading', type: 'text', required: true },
      {
        name: 'links',
        type: 'array',
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'url', type: 'text' },
          { name: 'page', type: 'relationship', relationTo: 'pages' },
        ],
      },
    ],
  },
  {
    name: 'address',
    type: 'group',
    fields: [
      { name: 'line1', type: 'text' },
      { name: 'line2', type: 'text' },
      { name: 'city', type: 'text' },
      { name: 'postcode', type: 'text' },
      { name: 'phone', type: 'text' },
      { name: 'email', type: 'text' },
    ],
  },
  {
    name: 'charityNumber',
    type: 'text',
    label: 'Charity Registration Number',
  },
  {
    name: 'copyright',
    type: 'text',
    defaultValue: '© Quwwat-ul-Islam Society. All rights reserved.',
  },
]
```

---

### 3. `site-settings`

```ts
fields: [
  { name: 'siteTitle', type: 'text', defaultValue: 'Quwwat-ul-Islam Society' },
  { name: 'tagline', type: 'text' },
  { name: 'defaultMetaDescription', type: 'textarea' },
  { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
  {
    name: 'socialLinks',
    type: 'array',
    fields: [
      { name: 'platform', type: 'select', options: ['facebook', 'twitter', 'instagram', 'youtube', 'whatsapp'] },
      { name: 'url', type: 'text' },
    ],
  },
]
```

---

### 4. `donate-settings`

This global provides configurable data to the hardcoded donate bar component. The donate bar's markup/styling is NOT in the CMS — only the data.

```ts
fields: [
  {
    name: 'amounts',
    type: 'array',
    label: 'Donation Amount Options',
    defaultValue: [
      { value: 10 }, { value: 20 }, { value: 30 },
      { value: 50 }, { value: 75 }, { value: 100 },
    ],
    fields: [
      { name: 'value', type: 'number', required: true },
    ],
  },
  {
    name: 'defaultAmount',
    type: 'number',
    defaultValue: 30,
  },
  {
    name: 'frequencies',
    type: 'array',
    defaultValue: [
      { label: 'Weekly', value: 'weekly' },
      { label: 'Monthly', value: 'monthly' },
      { label: 'One-off', value: 'one-off' },
    ],
    fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'value', type: 'text', required: true },
    ],
  },
  {
    name: 'defaultFrequency',
    type: 'text',
    defaultValue: 'monthly',
  },
  {
    name: 'heading',
    type: 'text',
    defaultValue: 'Support Your Masjid',
  },
  {
    name: 'description',
    type: 'textarea',
  },
  {
    name: 'ctaText',
    type: 'text',
    defaultValue: 'Donate Now',
  },
  {
    name: 'ctaUrl',
    type: 'text',
    label: 'Donate Button URL',
    admin: { description: 'URL to your payment processor (e.g. Stripe, GoCardless, or external donate page)' },
  },
]
```

---

## Block Definitions

### `hero-slider`

```ts
{
  slug: 'hero-slider',
  labels: { singular: 'Hero Slider', plural: 'Hero Sliders' },
  fields: [
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      maxRows: 5,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'kicker', type: 'text', admin: { description: 'Small uppercase text above the title (optional)' } },
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaUrl', type: 'text' },
      ],
    },
    {
      name: 'autoAdvance',
      type: 'number',
      label: 'Auto-advance interval (seconds)',
      defaultValue: 6,
      admin: { description: 'Set to 0 to disable auto-advance' },
    },
  ],
}
```

### `hero-simple`

```ts
{
  slug: 'hero-simple',
  labels: { singular: 'Hero (Simple)', plural: 'Hero (Simple)' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    {
      name: 'overlayOpacity',
      type: 'select',
      options: [
        { label: 'Light (15%)', value: '15' },
        { label: 'Medium (25%)', value: '25' },
        { label: 'Dark (40%)', value: '40' },
      ],
      defaultValue: '25',
    },
  ],
}
```

### `rich-text`

```ts
{
  slug: 'rich-text',
  labels: { singular: 'Rich Text', plural: 'Rich Text Blocks' },
  fields: [
    { name: 'content', type: 'richText', required: true },
    {
      name: 'width',
      type: 'select',
      options: [
        { label: 'Normal (prose width)', value: 'normal' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full Width', value: 'full' },
      ],
      defaultValue: 'normal',
      admin: { description: 'Normal constrains text to a readable width (~720px). Wide uses ~960px. Full uses the full container.' },
    },
  ],
}
```

### `section-heading`

```ts
{
  slug: 'section-heading',
  labels: { singular: 'Section Heading', plural: 'Section Headings' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    {
      name: 'alignment',
      type: 'select',
      options: ['left', 'center'],
      defaultValue: 'left',
    },
  ],
}
```

### `card-grid`

```ts
{
  slug: 'card-grid',
  labels: { singular: 'Card Grid', plural: 'Card Grids' },
  fields: [
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Manual (pick cards below)', value: 'manual' },
        { label: 'From News collection', value: 'news' },
        { label: 'From Services collection', value: 'services' },
      ],
      defaultValue: 'manual',
    },
    {
      name: 'cards',
      type: 'array',
      admin: { condition: (data, siblingData) => siblingData.source === 'manual' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'linkLabel', type: 'text' },
        { name: 'linkUrl', type: 'text' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of items to show',
      defaultValue: 6,
      admin: { condition: (data, siblingData) => siblingData.source !== 'manual' },
    },
    {
      name: 'columns',
      type: 'select',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      defaultValue: '3',
    },
    {
      name: 'background',
      type: 'select',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Teal Tint', value: 'teal-tint' },
      ],
      defaultValue: 'white',
    },
  ],
}
```

### `icon-card-grid`

```ts
{
  slug: 'icon-card-grid',
  labels: { singular: 'Icon Card Grid', plural: 'Icon Card Grids' },
  fields: [
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'icon', type: 'upload', relationTo: 'media', admin: { description: 'SVG icon preferred' } },
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text' },
        { name: 'page', type: 'relationship', relationTo: 'pages' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      options: [
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      defaultValue: '4',
    },
  ],
}
```

### `news-feature`

```ts
{
  slug: 'news-feature',
  labels: { singular: 'News Feature', plural: 'News Features' },
  fields: [
    {
      name: 'populateFrom',
      type: 'select',
      options: [
        { label: 'Latest (automatic)', value: 'latest' },
        { label: 'Manual selection', value: 'manual' },
      ],
      defaultValue: 'latest',
    },
    {
      name: 'featuredArticle',
      type: 'relationship',
      relationTo: 'news',
      admin: { condition: (data, siblingData) => siblingData.populateFrom === 'manual' },
    },
    {
      name: 'sideArticles',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      maxRows: 4,
      admin: { condition: (data, siblingData) => siblingData.populateFrom === 'manual' },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      admin: {
        condition: (data, siblingData) => siblingData.populateFrom === 'latest',
        description: 'Total articles to show (1 featured + rest as small cards)',
      },
    },
    {
      name: 'showViewAllLink',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
```

### `team-grid`

```ts
{
  slug: 'team-grid',
  labels: { singular: 'Team Grid', plural: 'Team Grids' },
  fields: [
    {
      name: 'populateFrom',
      type: 'select',
      options: [
        { label: 'All team members (by order)', value: 'all' },
        { label: 'Manual selection', value: 'manual' },
      ],
      defaultValue: 'all',
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: true,
      admin: { condition: (data, siblingData) => siblingData.populateFrom === 'manual' },
    },
    {
      name: 'columns',
      type: 'select',
      options: [
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      defaultValue: '3',
    },
  ],
}
```

### `contact-split`

```ts
{
  slug: 'contact-split',
  labels: { singular: 'Contact Split', plural: 'Contact Splits' },
  fields: [
    {
      name: 'infoSide',
      type: 'group',
      label: 'Information Column',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Get in Touch' },
        { name: 'description', type: 'textarea' },
        { name: 'showAddress', type: 'checkbox', defaultValue: true, admin: { description: 'Pull address from Footer global' } },
        { name: 'showPhone', type: 'checkbox', defaultValue: true },
        { name: 'showEmail', type: 'checkbox', defaultValue: true },
        {
          name: 'openingHours',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },  // e.g. "Mon-Fri"
            { name: 'hours', type: 'text' },   // e.g. "9:00 AM - 5:00 PM"
          ],
        },
      ],
    },
    {
      name: 'formSide',
      type: 'group',
      label: 'Form Column',
      fields: [
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',  // From form-builder plugin
          required: true,
        },
      ],
    },
  ],
}
```

### `map-embed`

```ts
{
  slug: 'map-embed',
  labels: { singular: 'Map Embed', plural: 'Map Embeds' },
  fields: [
    { name: 'googleMapsEmbedUrl', type: 'text', required: true, admin: { description: 'Paste the Google Maps embed URL (from Google Maps > Share > Embed)' } },
    {
      name: 'height',
      type: 'select',
      options: [
        { label: 'Small (300px)', value: '300' },
        { label: 'Medium (450px)', value: '450' },
        { label: 'Large (600px)', value: '600' },
      ],
      defaultValue: '450',
    },
  ],
}
```

### `form-block`

```ts
{
  slug: 'form-block',
  labels: { singular: 'Form', plural: 'Forms' },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',  // From form-builder plugin
      required: true,
    },
    { name: 'heading', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
}
```

### `cta-banner`

```ts
{
  slug: 'cta-banner',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'ctaLabel', type: 'text', required: true },
    { name: 'ctaUrl', type: 'text' },
    { name: 'ctaPage', type: 'relationship', relationTo: 'pages' },
    {
      name: 'style',
      type: 'select',
      options: [
        { label: 'Navy Background', value: 'navy' },
        { label: 'Teal Background', value: 'teal' },
        { label: 'Teal Tint Background', value: 'teal-tint' },
      ],
      defaultValue: 'teal',
    },
  ],
}
```

### `event-list`

```ts
{
  slug: 'event-list',
  labels: { singular: 'Event List', plural: 'Event Lists' },
  fields: [
    {
      name: 'filter',
      type: 'select',
      options: [
        { label: 'Upcoming only', value: 'upcoming' },
        { label: 'All events', value: 'all' },
      ],
      defaultValue: 'upcoming',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 10,
    },
    {
      name: 'showPastEvents',
      type: 'checkbox',
      label: 'Show "Past Events" section below',
      defaultValue: false,
    },
  ],
}
```

### `faq-accordion`

```ts
{
  slug: 'faq-accordion',
  labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'richText', required: true },
      ],
    },
  ],
}
```

### `spacer`

```ts
{
  slug: 'spacer',
  labels: { singular: 'Spacer', plural: 'Spacers' },
  fields: [
    {
      name: 'size',
      type: 'select',
      options: [
        { label: 'Small (16px)', value: 'sm' },
        { label: 'Medium (32px)', value: 'md' },
        { label: 'Large (48px)', value: 'lg' },
        { label: 'Extra Large (64px)', value: 'xl' },
      ],
      defaultValue: 'md',
    },
  ],
}
```

---

## Pre-built Page Templates

Implement template pre-population using a `beforeChange` hook on the `pages` collection. When a new page is created and a template is selected, auto-populate the `layout` field with default blocks AND set the `showDonateBar` / `donateBarPosition` defaults.

**Only pre-populate if the layout is currently empty** (so switching templates on an existing page doesn't wipe content).

### Template Defaults

**Home:**
```ts
{
  showDonateBar: true,
  donateBarPosition: 'below-hero',
  layout: [
    { blockType: 'hero-slider', slides: [{ title: 'Welcome', subtitle: '' }], autoAdvance: 6 },
    { blockType: 'news-feature', populateFrom: 'latest', limit: 3, showViewAllLink: true },
    { blockType: 'icon-card-grid', columns: '4', cards: [] },
  ],
}
```

**About:**
```ts
{
  showDonateBar: false,
  layout: [
    { blockType: 'hero-simple', title: 'About QIS', overlayOpacity: '25' },
    { blockType: 'rich-text', width: 'normal', content: {} },
    { blockType: 'section-heading', heading: 'Our Team', alignment: 'left' },
    { blockType: 'team-grid', populateFrom: 'all', columns: '3' },
    { blockType: 'cta-banner', heading: 'Become a Member', ctaLabel: 'Join Us', style: 'teal' },
  ],
}
```

**Contact:**
```ts
{
  showDonateBar: false,
  layout: [
    { blockType: 'hero-simple', title: 'Contact Us', overlayOpacity: '25' },
    { blockType: 'contact-split', infoSide: { heading: 'Get in Touch', showAddress: true, showPhone: true, showEmail: true }, formSide: {} },
    { blockType: 'map-embed', height: '450' },
  ],
}
```

**Services:**
```ts
{
  showDonateBar: false,
  layout: [
    { blockType: 'hero-simple', title: 'Our Services', overlayOpacity: '25' },
    { blockType: 'rich-text', width: 'normal', content: {} },
    { blockType: 'card-grid', source: 'services', columns: '3', limit: 9, background: 'white' },
    { blockType: 'cta-banner', heading: 'Volunteer With Us', ctaLabel: 'Get Involved', style: 'teal' },
  ],
}
```

**Donate:**
```ts
{
  showDonateBar: true,
  donateBarPosition: 'below-hero',
  layout: [
    { blockType: 'hero-simple', title: 'Support QIS', overlayOpacity: '25' },
    { blockType: 'rich-text', width: 'normal', content: {} },
    { blockType: 'card-grid', source: 'manual', columns: '3', background: 'white', cards: [] },
    { blockType: 'rich-text', width: 'normal', content: {} },
  ],
}
```

**Events:**
```ts
{
  showDonateBar: false,
  layout: [
    { blockType: 'hero-simple', title: 'Events', overlayOpacity: '25' },
    { blockType: 'event-list', filter: 'upcoming', limit: 10, showPastEvents: false },
  ],
}
```

**News Listing:**
```ts
{
  showDonateBar: false,
  layout: [
    { blockType: 'hero-simple', title: 'Latest News', overlayOpacity: '25' },
    { blockType: 'news-feature', populateFrom: 'latest', limit: 3, showViewAllLink: false },
    { blockType: 'card-grid', source: 'news', columns: '3', limit: 9, background: 'white' },
  ],
}
```

**General:**
```ts
{
  showDonateBar: false,
  layout: [
    { blockType: 'hero-simple', title: '', overlayOpacity: '25' },
    { blockType: 'rich-text', width: 'normal', content: {} },
  ],
}
```

---

## Access Control

Set up two roles:

1. **Admin** — full access to everything
2. **Editor** — can create/edit pages, news, events, services, team-members. Cannot delete collections or modify globals (except header announcement bar). Cannot access site-settings.

---

## API Endpoints the Frontend Will Consume

The Astro frontend will call these Payload REST API endpoints:

- `GET /api/pages?where[slug][equals]={slug}&depth=2` — fetch a page by slug with populated relationships
- `GET /api/news?where[status][equals]=published&sort=-publishedDate&limit={n}` — latest published news
- `GET /api/news?where[featured][equals]=true&where[status][equals]=published&limit=1` — featured article
- `GET /api/events?where[status][equals]=upcoming&sort=eventDate&limit={n}` — upcoming events
- `GET /api/services?sort=order` — all services ordered
- `GET /api/team-members?sort=order` — all team members ordered
- `GET /api/globals/header` — header/nav data
- `GET /api/globals/footer` — footer data
- `GET /api/globals/site-settings` — site metadata
- `GET /api/globals/donate-settings` — donate bar configuration

---

## Design System Reference (for the frontend, NOT for CMS styling)

The frontend uses these design tokens. You do NOT need to style the CMS admin panel with these — this is just for reference so you understand what the frontend expects:

### Colors
- Navy (primary): `#0f243e`
- Teal (accent): `#44839e`
- Green (secondary): `#3e7e59`
- Muted: `#a7a9ac`
- Gray Text: `#777777`
- Light BG: `#eff4f4`
- Teal Tint: `rgba(68,131,158,0.09)`
- Green Tint: `rgba(62,126,89,0.18)`

### Typography
- Font: Satoshi (from FontShare)
- Weights: 300, 400, 500, 700, 900

### Border Radius
- Sections: 24px (mobile) / 40px (desktop)
- Buttons: 12px (rounded-xl) / rounded-full for pills
- Cards: 8-16px

### Breakpoints
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px

---

## Important Notes

1. **The donate bar is NOT a CMS block.** It is a hardcoded frontend component. The CMS only provides a page-level checkbox to show/hide it, a position selector, and a `donate-settings` global for configurable data (amounts, frequencies, CTA text/URL).

2. **Design tokens are NOT in the CMS.** Colors, fonts, spacing, radii are all managed in frontend code (Tailwind CSS `@theme` in `global.css`). The CMS only manages content and page structure.

3. **Use `depth=2`** when fetching pages so that relationships (media, news, services, team-members, forms) are fully populated in a single request.

4. **Slug generation** — auto-generate slugs from titles using a `beforeValidate` hook. Use a library like `slugify` or a simple regex replace.

5. **Rich text serialization** — The frontend will need a Lexical-to-HTML serializer (or Lexical-to-Astro-components renderer) to render rich text content. Consider using `@payloadcms/richtext-lexical`'s built-in serialization utilities.

6. **Image sizes** — The `media` collection defines three sizes (thumbnail, card, hero). The frontend should use the appropriate size per context to optimize loading.

7. **Template pre-population** — Only populate the layout when it is empty. The `beforeChange` hook should check `if (!data.layout || data.layout.length === 0)` before injecting template defaults. This prevents overwriting existing content if an editor changes the template selector on a page that already has blocks.
