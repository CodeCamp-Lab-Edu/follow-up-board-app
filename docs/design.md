---
name: Executive Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#424656'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737687'
  outline-variant: '#c3c6d8'
  surface-tint: '#0052dd'
  primary: '#004ccd'
  on-primary: '#ffffff'
  primary-container: '#0f62fe'
  on-primary-container: '#f3f3ff'
  inverse-primary: '#b4c5ff'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#9e3100'
  on-tertiary: '#ffffff'
  tertiary-container: '#c84000'
  on-tertiary-container: '#fff1ed'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174c'
  on-primary-fixed-variant: '#003da9'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59d'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832700'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system is engineered for high-velocity contact management within a professional SaaS context. It focuses on **Modern Minimalism** to reduce cognitive load, allowing users to navigate complex datasets without distraction. The aesthetic is governed by high-density information layouts that maintain "breathability" through generous white space and a systematic grid. 

The emotional response is one of reliability, efficiency, and clarity. By utilizing clean borders and subtle depth rather than heavy decorative elements, the interface recedes to prioritize the user's data.

## Colors
The palette is anchored by a "Professional Blue" primary color, chosen for its association with trust and stability in enterprise environments. 

- **Primary (#0F62FE):** Reserved for primary actions, active states, and critical wayfinding.
- **Neutrals:** A slate-based gray scale (from #0F172A to #F8FAFC) provides a sophisticated, cool-toned foundation that prevents the UI from feeling "muddy."
- **Semantic Accents:** Emerald, Amber, and Rose are used strictly for status signaling (Online, Pending, Urgent) and are applied to badges and small indicators to maintain the minimalist aesthetic.

## Typography
This design system utilizes **Inter** exclusively to ensure maximum legibility across data-heavy tables and dashboards. The type scale is optimized for screen-based reading, emphasizing a clear hierarchy between high-level summaries and granular metadata.

- **Headlines:** Use a tighter letter-spacing and heavier weights to anchor sections.
- **Body:** Standardized at 14px for the primary interface (Body-MD) to balance information density with readability.
- **Labels:** Small caps or bold weights are used for table headers and form labels to differentiate them from user-generated content.

## Layout & Spacing
The design system employs a **12-column fluid grid** for the main content area, with a fixed-width left sidebar (240px) for navigation. 

- **Grid:** On desktop, use 32px outer margins and 20px gutters. 
- **Rhythm:** An 8px linear scale (incremented by 4px for tight components) governs all padding and margins to ensure a consistent vertical rhythm.
- **Responsibility:** On mobile, the grid collapses to a single column with 16px margins; the sidebar transforms into a bottom navigation bar or a hidden drawer.

## Elevation & Depth
Depth is conveyed through **low-contrast outlines** and **ambient shadows**. This approach ensures that the UI feels layered without appearing heavy or dated.

- **Level 0 (Canvas):** Background color (#F8FAFC), flat.
- **Level 1 (Cards/Tables):** White surface (#FFFFFF) with a 1px border (#E2E8F0) and a very soft, diffused shadow (0px 1px 3px rgba(15, 23, 42, 0.05)).
- **Level 2 (Dropdowns/Popovers):** Higher elevation with a more pronounced shadow (0px 10px 15px -3px rgba(15, 23, 42, 0.1)) to indicate temporary interaction.
- **Active State:** Elements being dragged or interacted with use a 2px Primary color border instead of increased shadow.

## Shapes
A **Soft (0.25rem)** roundedness level is applied to maintain a professional, slightly geometric character. 

- **Standard Elements:** Buttons, input fields, and checkboxes use a 4px (0.25rem) radius.
- **Containers:** Large cards and data tables use an 8px (0.5rem) radius to soften the overall dashboard layout.
- **Badges:** Status indicators (Online/Pending) use a fully rounded (pill) shape to distinguish them clearly from interactive buttons.

## Components
- **Buttons:** Primary buttons use solid fills; secondary buttons use the low-contrast outline style. All buttons should have a minimum height of 36px for accessibility.
- **Data Tables:** Use a "zebra-striping" or subtle bottom-border-only approach. Headers must remain "sticky" during scroll. Column content should align with typography roles (e.g., Labels for headers, Body-MD for row data).
- **Status Badges:** Compact containers with a subtle background tint and high-contrast text (e.g., Emerald background at 10% opacity with Emerald text at 100% opacity).
- **Input Fields:** Use a 1px Slate-200 border that transitions to Primary Blue on focus. Labels should always sit outside the field for permanent visibility.
- **Search Bars:** Feature a leading magnifying glass icon and a keyboard shortcut hint (e.g., "⌘K") in the trailing edge.
- **Contact Cards:** Summary blocks for the dashboard should prioritize a single metric (e.g., "Total Contacts") using the `display-lg` font role.