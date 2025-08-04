# SITE REFACTOR TASK CHECKLIST

## 1. Visual hierarchy
- [x] Replace all italic-red emphasis with accent-red token (one per heading max).
- [x] Cap H1 length at ≤ 9 words; move secondary copy to .lead paragraph.

## 2. Colour & contrast
- [x] Swap existing reds with accent-red.
- [ ] Upgrade light-grey text to neutral-300; only when ≥ 14 px or bold ≥ 12 px.

## 3. Navigation
- [x] Implement hamburger per Responsive Navigation CSS.
- [ ] Trim CTA repetitions to two (hero + footer).

## 4. Accessibility
- [x] Add aria-label to every CTA and video thumbnail.
- [x] Add semantic landmarks: <header>, <main>, <section>, <nav>.
- [ ] Ensure comparison-table rows include ✔ / ✖ pseudo-icons.

## 5. Performance
- [x] Lazy-load all images / videos (loading="lazy" decoding="async").
- [ ] Add sizes + srcset to hero media.

## 6. Proof-points
- [ ] Link "Loved by creators" badge to real review page.
- [ ] For metrics (views, CTR) link to a documented case study.

## 7. Responsive tweaks
- [ ] Switch pricing cards to the .grid layout (minmax(20rem, 1fr)).
- [x] Add word-break: break-word to long headings for 320 px screens.

## Components Updated
- [x] Hero.tsx - Semantic HTML, accessibility, design tokens
- [x] Header.tsx - Responsive navigation classes
- [x] styles/globals.css - Design system tokens, accessibility improvements
- [x] tailwind.config.js - Design system tokens

## Next Steps
- [ ] Update Pricing component with grid layout
- [ ] Update Services component with proper semantic HTML
- [ ] Add comparison table with accessibility icons
- [ ] Implement image optimization with srcset
- [ ] Link proof-points to real content
- [ ] Review and update color contrast throughout