---
name: Atelier Éternel
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#444748'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#745a27'
  on-secondary: '#ffffff'
  secondary-container: '#ffdb9b'
  on-secondary-container: '#795f2b'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#201b12'
  on-tertiary-container: '#8c8276'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e4c284'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5a4312'
  tertiary-fixed: '#ece1d3'
  tertiary-fixed-dim: '#d0c5b7'
  on-tertiary-fixed: '#201b12'
  on-tertiary-fixed-variant: '#4d463b'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
  quote:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 30px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The design system embodies an editorial, high-end wedding invitation atelier. The brand personality is sophisticated, timeless, and exclusive, targeting a clientele that values craftsmanship and understated luxury. 

The aesthetic is rooted in **Modern Minimalism** with a **Tactile** influence. It prioritizes expansive whitespace to create a sense of calm and breathing room, mimicking the physical margins of fine stationery. Layouts are structured like premium print magazines, utilizing a mix of high-contrast typography and subtle textural depth to evoke the physical sensation of heavy cardstock and gold-leaf foiling.

## Colors
The palette is built on a foundation of **Ivory** and **Warm White** to simulate various paper stocks. **Deep Charcoal** provides an authoritative, ink-like contrast for typography. 

**Champagne Gold** and **Soft Gold** are reserved for interactive accents, subtle dividers, and focal points, representing metallic foil finishes. **Taupe** and **Warm Beige** act as secondary neutrals for surface layering and container backgrounds, ensuring the UI feels warm and inviting rather than clinical.

## Typography
The typography system relies on the interplay between the elegant, high-contrast **Playfair Display** and the functional, modern **Manrope**. 

- **Headlines:** Use Playfair Display for all major headings. Large display sizes should use tighter letter spacing for a refined "masthead" look.
- **Body Text:** Manrope is set with a light weight (300) for long-form descriptions to maintain an airy, modern feel.
- **Labels:** Small labels, categories, and overlines must use `label-caps` (Manrope, Uppercase, 0.15em spacing) to provide a structured, architectural contrast to the fluid serif headlines.

## Layout & Spacing
This design system utilizes a **Fixed Grid** model on desktop and a **Fluid Grid** on mobile. The layout is inspired by editorial design, favoring asymmetrical compositions and generous margins.

- **Desktop:** 12-column grid with a maximum width of 1280px. Use wide 64px outer margins to frame content like a page in a book.
- **Sectioning:** Large vertical gaps (120px+) should separate major catalog categories to emphasize exclusivity and prevent visual clutter.
- **Micro-spacing:** Elements within a card or module follow an 8px base unit rhythm, but decorative elements (like thin gold dividers) should be placed with intentional "white space" around them.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Low-Contrast Outlines** rather than aggressive shadows.

1.  **Surfaces:** Use `Ivory` as the base background. Use `Warm White` for elevated cards or detail sections to create a subtle "layered paper" effect.
2.  **Borders:** Use thin (1px) borders in `Taupe` (at 20% opacity) or `Champagne Gold` to define sections without breaking the visual flow.
3.  **Shadows:** When necessary (e.g., for modal sheets or "Enquire" drawers), use extremely soft, diffused shadows: `rgba(23, 23, 23, 0.04)` with a 40px blur. This suggests the soft shadow cast by thick cotton paper.

## Shapes
In alignment with the editorial and premium aesthetic, the design system uses **Sharp (0)** corners for all primary UI elements. Squares and rectangles mimic the precision of trimmed stationery.

Circular elements are permitted only for specialized icons or decorative "wax seal" components. Primary containers, buttons, and input fields must maintain 90-degree angles to uphold a disciplined, architectural tone.

## Components

- **Buttons:** Primary buttons are solid `Deep Charcoal` with `Warm White` text (Manrope, Uppercase). Secondary buttons use a 1px `Deep Charcoal` border with no fill. On hover, buttons transition subtly to `Champagne Gold`.
- **Enquiry Inputs:** Fields are "minimalist style"—a single `Deep Charcoal` 1px line at the bottom, with a `label-caps` floating label above it. No background fill.
- **Product Cards:** Image-heavy with a `Warm White` background. Product titles are `headline-sm`. The card should have no border, using whitespace and alignment to define its boundaries.
- **Chips/Filters:** Rectangular (sharp) with a 1px `Taupe` border. Active state uses `Champagne Gold` text and a gold border.
- **The "Enquire" Drawer:** A side-anchored panel that slides in from the right, using the `surface_warm_beige` background to differentiate the enquiry workflow from the catalog browsing experience.
- **Dividers:** Use 1px horizontal lines in `Soft Gold` or `Taupe` (low opacity). Often used to separate the "Collection Name" from the "Collection Description" in the catalog.