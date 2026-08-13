---
name: Atelier Éternel Nocturne
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c6c7c2'
  on-secondary: '#2f312e'
  secondary-container: '#484a46'
  on-secondary-container: '#b8b9b4'
  tertiary: '#e4cb9e'
  on-tertiary: '#3d2e0e'
  tertiary-container: '#c7b085'
  on-tertiary-container: '#534321'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e3e3de'
  secondary-fixed-dim: '#c6c7c2'
  on-secondary-fixed: '#1a1c19'
  on-secondary-fixed-variant: '#454744'
  tertiary-fixed: '#f9dfb1'
  tertiary-fixed-dim: '#dcc497'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#554422'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system embodies a high-end, editorial aesthetic tailored for luxury retail, fine art galleries, and premium lifestyle publications. It focuses on a "Digital Atelier" concept—where every pixel feels curated, intentional, and permanent.

The visual direction combines **Minimalism** with **High-Contrast Typography**. It leverages expansive negative space to frame content like artifacts in a gallery. The emotional response is one of exclusivity, quiet confidence, and timelessness. The transition to a dark-mode-first architecture enhances the sense of prestige, using light and shadow to guide the eye toward "hero" content.

## Colors

This design system utilizes a high-contrast dark palette to define hierarchy and prestige.

- **Primary (Metallic Gold):** Used sparingly for key calls to action, active states, and decorative flourishes. It represents the "touch of the artisan."
- **Secondary (Ivory):** The primary color for high-emphasis text and icons, providing a softer, more sophisticated contrast than pure white.
- **Tertiary (Muted Gold):** Used for sub-headings, captions, and secondary metadata to create a layered information architecture.
- **Neutral (Charcoal/Black):** The foundation of the UI. `#121212` serves as the base surface, with slightly elevated tiers using `#1A1A1A`.

Functional colors for success, error, and warning should be desaturated to maintain the aesthetic harmony of the palette.

## Typography

Typography is the core of the design system's identity. 

1. **Playfair Display** is used for headlines to evoke a literary, high-fashion feel. Use bold weights for large displays and medium weights for smaller headings to maintain legibility.
2. **Source Serif 4** provides a highly readable, classic companion for body text, ensuring long-form content remains comfortable to consume on dark backgrounds.
3. **Montserrat** acts as the functional engine. It is used exclusively for labels, buttons, and navigation elements. It must always be tracked out when used in all-caps to maintain a modern, architectural feel.

## Layout & Spacing

The design system utilizes a **Fixed Grid** model for desktop to ensure content remains centered and framed like a portrait. 

- **Desktop:** 12-column grid with a 1280px max-width. Margins are intentionally wide (64px) to emphasize exclusivity.
- **Tablet:** 8-column grid with 32px margins.
- **Mobile:** 4-column grid with 16px margins.

Spacing follows an 8px base unit. Use generous vertical rhythm between sections (e.g., 80px or 120px) to allow the high-end typography room to breathe.

## Elevation & Depth

In this dark-mode environment, depth is communicated through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows.

- **Surface 0:** `#121212` (Main background).
- **Surface 1:** `#1A1A1A` (Cards, navigation bars).
- **Surface 2:** `#242424` (Inputs, hovering states).

For borders, use 1px solid strokes in `#2D2D2D` or a very faint Primary Gold at 20% opacity. Avoid drop shadows unless they are "glow" effects—diffused, low-opacity gold blurs used behind featured items to simulate a spotlight in a dark room.

## Shapes

The design system employs a **Sharp** shape language. All containers, buttons, and input fields use 0px border-radius. This angularity reinforces a sense of architectural precision and professional rigor.

Images should also maintain sharp corners, though they may use subtle inner-stroke borders (0.5pt Ivory at 10% opacity) to separate them from the deep black background.

## Components

### Buttons
- **Primary:** Solid Ivory text on a Gold (#D4AF37) background. Sharp corners. No shadow.
- **Secondary:** Gold (#D4AF37) border, 1px. Ghost background. Gold text.
- **Tertiary/Text:** Muted Gold text with a 1px Gold underline that expands on hover.

### Input Fields
- Underline-only style or a full 1px border in `#2D2D2D`. 
- Active state: Border changes to Primary Gold. 
- Label: Montserrat, All-caps, Muted Gold.

### Cards
- Background: Surface 1 (`#1A1A1A`). 
- Border: 1px solid `#242424`.
- Padding: 32px to maintain a gallery-like feel.

### Lists
- Separated by thin 1px lines in `#242424`. 
- High-contrast Ivory for the list item title and Muted Gold for the description.

### Chips/Tags
- Small Montserrat caps. 1px border. No fill. Used for categories or status indicators.