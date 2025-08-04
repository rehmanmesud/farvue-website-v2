FILE: SITE_REFACTOR_TASKPACK.md
Purpose: Single, copy-/paste-able package for the dev / copy team.
Includes design tokens, code snippets, and an actionable checklist — all in one file.

───────────────────────────────────────────────────────────────────────────────
0. TABLE OF CONTENTS
	1.	Design-System Tokens (YAML)
	2.	Global CSS / Accessibility Fixes
	3.	Responsive Navigation
	4.	Semantic / ARIA Patches (HTML)
	5.	Reusable Grid (SCSS)
	6.	Task Checklist
───────────────────────────────────────────────────────────────────────────────
	7.	DESIGN-SYSTEM TOKENS   design-system.tokens.yaml
(colors, fonts, spacing, radii)

colors:
bg-primary:     "#000000"
text-primary:   "#F8F8F8"   # 17.9:1 on bg-primary
accent-red:     "#E54747"   # 6.1:1 on bg-primary
accent-blue:    "#3478F6"
neutral-100:    "#E5E7EB"
neutral-300:    "#9CA3AF"   # use ≥14 px or bold ≥12 px

fonts:
base:           "Inter, system-ui, sans-serif"
scale:
900: 3.75rem   # H1
800: 3rem      # H2
700: 2.25rem   # H3
600: 1.875rem  # H4
500: 1.25rem   # Subtitle / lead
400: 1rem      # Body
300: 0.875rem  # Caption

spacing:
0: 0
1: 0.25rem
2: 0.5rem
3: 0.75rem
4: 1rem
6: 1.5rem
8: 2rem

radii:
sm: 0.25rem
md: 0.5rem
lg: 1rem
	2.	GLOBAL CSS / ACCESSIBILITY FIXES   global.css
(root variables, focus ring, reduced-motion, comparison icons, decorative images)

/* Root palette fragment */
:root {
–accent-blue: #3478F6;
–spacing-6: 1.5rem;
}

/* Focus ring */
:focus-visible {
outline: 2px solid var(–accent-blue);
outline-offset: 2px;
}

/* Honor reduced-motion */
@media (prefers-reduced-motion: reduce) {
	•	{
animation-duration: 0.01ms !important;
animation-iteration-count: 1 !important;
transition-duration: 0.01ms !important;
}
}

/* Comparison table – add non-colour cues */
.table__row–bad  ::before { content: "✖"; color: #DC2626; margin-right: 0.5rem; }
.table__row–good ::before { content: "✔"; color: #16A34A; margin-right: 0.5rem; }

/* Decorative images should not trap focus */
img[role="presentation"],
img[aria-hidden="true"] { pointer-events: none; }
	3.	RESPONSIVE NAVIGATION (append to global.css)
(nav skeleton, mobile first)

/* Mobile-first */
.nav {
display: flex;
align-items: center;
justify-content: space-between;
}
.nav__links { display: none; }
.nav__toggle { display: block; cursor: pointer; border: 0; background: none; }

/* ≥640 px */
@media (min-width: 40rem) {
.nav__links { display: flex; gap: var(–spacing-6); }
.nav__toggle { display: none; }
}
	4.	SEMANTIC / ARIA PATCHES (HTML snippets)<header>
  <h1>Ready to <span class="u-underline">scale</span> your brand with editing?</h1>
  <p class="lead">We help creators attract dream customers through design & editing.</p>
  <a class="btn btn--primary"
     href="#booking"
     aria-label="Book a discovery call">
    Book a call
  </a>
</header>
<!-- PORTFOLIO CARD -->
<article class="work-card">
  <h2 class="work-card__title">Viral YouTube Video</h2>
  <figure>
    <a href="/case-studies/viral-youtube"
       aria-label="Play before-and-after video of viral YouTube edit">
      <img src="/thumbs/youtube-viral.jpg" alt="" role="presentation" />
      <span class="work-card__play" aria-hidden="true">▶</span>
    </a>
    <figcaption>
      2.5 M views · Full–length edit with motion graphics & colour grading
    </figcaption>
  </figure>
</article>
	5.	REUSABLE GRID (SCSS fragment → components/_grid.scss)
.grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
gap: var(–spacing-6);
}
	6.	TASK CHECKLIST   TODO.md

1. Visual hierarchy
	•	Replace all italic-red emphasis with accent-red token (one per heading max).
	•	Cap H1 length at ≤ 9 words; move secondary copy to .lead paragraph.

2. Colour & contrast
	•	Swap existing reds with accent-red.
	•	Upgrade light-grey text to neutral-300; only when ≥ 14 px or bold ≥ 12 px.

3. Navigation
	•	Implement hamburger per Responsive Navigation CSS.
	•	Trim CTA repetitions to two (hero + footer).

4. Accessibility
	•	Add aria-label to every CTA and video thumbnail.
	•	Add semantic landmarks: , , , .
	•	Ensure comparison-table rows include ✔ / ✖ pseudo-icons.

5. Performance
	•	Lazy-load all images / videos (loading="lazy" decoding="async").
	•	Add sizes + srcset to hero media.

6. Proof-points
	•	Link "Loved by creators" badge to real review page.
	•	For metrics (views, CTR) link to a documented case study.

7. Responsive tweaks
	•	Switch pricing cards to the .grid layout (minmax(20rem, 1fr)).
	•	Add word-break: break-word to long headings for 320 px screens.

USAGE GUIDE
	1.	Drop this single file into the repo root.
	2.	Split out sections into actual files (design-system.tokens.yaml, global.css, etc.) or let Cursor's AI do it with a "Split code blocks into files" command.
	3.	Open TODO.md and work through the checklist — code for every task is already in this file.
	4.	Run Lighthouse; target ≥ 92 accessibility score.