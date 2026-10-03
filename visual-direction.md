# Portfolio — Visual Direction

This document is the source of truth for the Portfolio's project-specific visual identity. It records the direction already established, the constraints that should guide future exploration, and the decisions that still require validation. It does not define final screens, components, or implementation details.

## Visual concept

The Portfolio should feel like a small illustrated game world: colorful, interactive, intentional, and coherent.

The experience should borrow the framing of a game, stage, or visual novel without becoming a complex fictional product. It should feel alive and distinctive while remaining easy to understand and use.

The work presented should reinforce a professional focus on:

- AI-assisted prototyping;
- design systems;
- implementation;
- Product Design / UX/UI as the broader discipline.

The visual identity should not imitate a conventional corporate portfolio or a standard minimalist landing page.

## Personality

Primary attributes:

- Game-like and playful.
- Colorful.
- Interactive.

Supporting attributes:

- Curated.
- Distinctive and full of personality.
- Friendly.
- Intentional and considered.
- Professional without feeling corporate.

The personality should be expressive but controlled. It should avoid chaos, visual overload, or novelty without purpose.

## Desired perception

The first impression should be closer to entering a small interactive ecosystem or game-like scene than viewing a flat, static portfolio.

Visitors should perceive:

- a clear and recognizable visual identity;
- an experience with movement and life;
- a thoughtful balance between playfulness and professional credibility;
- strong personality without sacrificing clarity;
- a curated presentation of work rather than a generic designer template.

## Visual references

Reference territories to explore:

- Games and game interfaces.
- Illustrated stages and small worlds.
- Visual novels and their scene-plus-dialogue framing.
- Cartoon visual language.
- Pixel art used as a language or accent.
- Editorial compositions using cards, records, or information sheets.
- Interfaces that communicate life through purposeful motion.

Specific reference titles, creators, products, screenshots, and moodboard sources: TBD.

References should be evaluated for transferable principles rather than copied literally.

## Anti-references

Avoid directions that feel like:

- a corporate portfolio;
- a generic minimalist designer portfolio;
- a conventional enterprise-oriented “senior designer” presentation;
- a standard landing-page template;
- a neon-heavy gaming interface;
- a screen saturated with sprites or decorative game assets;
- arbitrary visual gimmicks;
- experimental compositions that compromise clarity or usability;
- confusing navigation patterns such as diagonal structures or unusual hexagonal menus.

Specific visual anti-reference examples: TBD.

## Color direction

The first accepted color direction for exploration is:

```text
Background / base  #F9E6C8
Primary / ink     #2F4048
Accent            #C7674A
```

- `#F9E6C8` is the light, warm, and soft base.
- `#2F4048` is the primary dark ink for content, hierarchy, and contrast.
- `#C7674A` is the warm, expressive accent.
- Preserve warmth and personality while avoiding a conventional corporate palette or excessive neon.
- Keep color hierarchy clear enough to support content, interaction, and accessibility.
- Do not assume that the accent is appropriate for small body text; validate every application by contrast and context.

These three colors are an accepted starting direction, not a complete palette or token system. Additional scales, secondary colors, semantic colors, states, and alternative themes must be introduced only when real design needs justify them.

## Typography direction

The first accepted typography direction is:

```text
Display / expressive  VT323
Body / UI             Source Sans 3
```

Use `VT323` for:

- titles and headings;
- special labels;
- narrative elements;
- selected accents that reinforce the game or pixel language.

Use `Source Sans 3` for:

- body copy;
- UI and controls;
- metadata;
- case-study information;
- content that requires sustained legibility.

The intended relationship is:

```text
VT323
→ personality / game / display

Source Sans 3
→ clarity / information / UI
```

Do not use `VT323` as the universal typeface for extended informational content. Preserve a clear hierarchy between expressive and informational text.

Typography scale, sizes, line heights, Source Sans 3 weights, and responsive typography rules: TBD.

## Spacing and rhythm

Spacing should keep the illustrated and game-like elements from becoming visually chaotic. Rhythm should support clear grouping, readable information, and deliberate pauses between narrative, interactive, and project content.

The exact spacing scale and rhythm rules: TBD.

## Density

Use controlled density:

- expressive enough to make the world feel alive;
- restrained enough to prevent sprite saturation or decorative overload;
- lower and more breathable around reading-heavy project details;
- structured enough that interactive and informational areas remain easy to scan.

Exact density targets by viewport or content type: TBD.

## Layout and composition

The home should feel like a stage, not a map and not an intentionally strange or experimental composition.

It should remain brief: a professional introduction, the visual framing, navigation, theme switch, and Selected Work. On desktop, the principal composition should aim to read as one scene within a common viewport when reasonably possible. This is a visual intention rather than a fixed-height rule; the composition must tolerate vertical overflow when viewport height, zoom, accessibility preferences, or content growth require it.

The closest structural inspiration is a visual novel:

- a character, avatar, or simple figure may inhabit the scene;
- a lower text box or panel may provide narrative or informational support;
- the panel may progressively accompany the professional introduction or current context;
- the framing may introduce the person, work, or current context without turning the portfolio into a complex fictional story.

Small interactive elements may add presence to the scene, but they must not hide essential information or turn basic navigation into a puzzle.

Project-detail views should shift toward a more informative composition. They should use clear records, blocks, or panels to explain:

- project context;
- problem;
- process;
- decisions;
- result;
- prototype, implementation, system, or other relevant outputs.

The project file should remain flexible: it may combine differently sized information blocks and visual evidence according to the needs of each case rather than impose one universal template.

Final screen layouts and content order: TBD.

## Grid

The grid must support both the staged home composition and clear, readable project-detail content. It should accommodate cards and information panels without forcing unusual navigation or sacrificing responsive clarity.

Column counts, margins, breakpoints, and alignment rules: TBD.

## Surfaces

Cards, text boxes, records, and information panels may act as interface surfaces within the illustrated world. Their treatment should help distinguish interactive, narrative, and informational content while maintaining one coherent identity.

Project Details should visually evoke a project file, record, or dossier without compromising reading flow. An access gate for restricted cases should belong to the same visual universe while remaining immediately recognizable as a clear, focused access step rather than another decorative scene.

Exact elevation, texture, background, and layering treatment: TBD.

## Borders and radius

Borders and radii should support the game-like, cartoon, or pixel-accented direction without reducing legibility or creating arbitrary decoration.

Exact border language, stroke weights, corner shapes, and radius scale: TBD.

## Image treatment

Imagery should belong to the same curated visual world and should not undermine the illustrated framing. Project media must remain clear enough to communicate the work itself.

The balance between illustration, screenshots, photography, video, and pixel or cartoon treatments: TBD.

## Project-card treatment

Selected Work should present projects as cards with a clear editorial and informational hierarchy. Each treatment must visually accommodate a project name, relevant areas or disciplines, a case-study action, and an access-state indicator when required, without predefining the final anatomy.

Cards should not feel completely static. When it adds meaningful context, a card may include:

- a short video;
- a short loop;
- a simple animation;
- a navigation or product preview;
- another brief media treatment that gives the project presence and life.

Movement should not be added as decoration when it does not improve understanding, preview the work, or reinforce the experience. Static and reduced-motion treatments must remain complete and understandable.

Exact card anatomy, states, and media behavior: TBD.

## Navigation treatment

Navigation should remain traditional and immediately understandable in its logic while feeling organic in its visual expression.

- Desktop: tab-style navigation at the top.
- Mobile: tab-style navigation at the bottom.
- Labels, states, and interaction cues must remain clear.
- Avoid extravagant spatial navigation or unfamiliar structures that make orientation harder.

The planned theme switch may be expressed organically or diegetically—for example, as a change in atmosphere or scene—but must remain recognizable as a conventional control. Its palette, iconography, transition, and visual behavior are not yet defined.

Exact tab styling, labels, and responsive transition behavior: TBD.

## Buttons and actions

Actions should be recognizable, readable, and consistent with the illustrated game-like world. Personality may affect their visual expression, but it must not obscure hierarchy, affordance, state, or purpose.

The visual system must be able to distinguish internal case-study actions, external actions such as `GITHUB ↗`, theme switching, and restricted-access submission. Access-state indicators and access-gate actions should be clear without relying only on color.

Exact button treatment, hierarchy, states, and action language: TBD.

## Iconography

Iconography may support the game, cartoon, or pixel language, but it should remain coherent and readable rather than becoming a collection of decorative sprites.

Specific icon style, source, grid, and usage rules: TBD.

## Motion / micro-interactions

Motion should give the experience life and reinforce its interactive character. It may support scene presence, navigation feedback, project previews, or small moments of response.

Motion must:

- have a clear communicative or experiential purpose;
- remain controlled rather than constant;
- avoid distracting from project information;
- never become an arbitrary gimmick;
- preserve clarity and usability.

Useful applications may include restrained ambient scene behavior, tab and control feedback, project-card media previews, access-state feedback, or a future theme transition. Case-study media may also use short videos, interaction previews, or edited system demonstrations as evidence, not decoration.

Exact motion language, timing, easing, reduced-motion behavior, and performance constraints: TBD.

## Responsive visual behavior

- Preserve the sense of a small interactive world across viewport sizes.
- Keep the home readable as a stage rather than allowing it to become an unclear collage or map.
- Aim for a compact, single-scene Home within a common desktop viewport when reasonably possible, without forcing fixed-height behavior.
- Allow visual overflow and natural scrolling when viewport height, zoom, accessibility preferences, or content growth require it.
- Place tab navigation at the top on desktop and at the bottom on mobile.
- Do not force mobile to reproduce the desktop scene literally or fit all Home content within one screen height.
- Prioritize legibility and comprehension in information-heavy project details.
- Adapt expressive elements without allowing them to crowd out content or controls.

Exact breakpoints, reflow rules, asset behavior, and the mobile presentation of multiple project cards: TBD.

## Accessibility / contrast

- Personality must not come at the expense of readability, comprehension, or professional presentation.
- The light or soft base and vivid accents must maintain sufficient contrast for text, controls, focus indicators, and states.
- Display or pixel typography should be limited to contexts where it remains readable; informational copy and UI require a legible companion typeface.
- Motion must not be necessary to understand content and should account for reduced-motion needs.
- Interactive elements must remain recognizable despite the organic visual treatment.
- Restricted status and access-gate feedback must not rely on color, imagery, or motion alone.
- The access gate must preserve clear instructions, visible focus, readable validation feedback, and familiar controls.
- Expressive scene elements must adapt before text or controls are compressed or obscured.

Target compliance level, contrast thresholds, focus treatment, and detailed accessibility validation criteria: TBD.

## Do

- Create the feeling of entering a small illustrated, interactive world.
- Use a clear, intentional, and coherent visual identity.
- Balance game-like expression with strong information hierarchy.
- Use color warmly and deliberately, with controlled vivid accents.
- Use cartoon and pixel language with restraint.
- Treat the home as a stage with possible visual-novel framing.
- Keep the Home brief and compose its main desktop content as one scene when conditions allow.
- Present projects through cards and project details through clear informational records or panels.
- Let project-detail media provide visual evidence of process, systems, prototypes, or implementation.
- Use purposeful movement to preview work or make the experience feel alive.
- Keep navigation familiar and easy to understand.
- Integrate theme switching and restricted access into the visual world while preserving familiar control behavior.
- Reinforce AI-assisted prototyping, design systems, and implementation within a Product Design / UX/UI practice.

## Don't

- Default to a corporate or generic minimalist portfolio aesthetic.
- Use a classic enterprise visual language to imply professional seniority.
- Turn the home into a map or an experimental composition that is difficult to understand.
- Turn the Home into a long sequence of personal-marketing sections.
- Enforce a single-viewport height when overflow is necessary for zoom, accessibility, content, or smaller screens.
- Overuse neon, sprites, pixel typography, or decorative motion.
- Add game references or gimmicks without a clear role.
- Sacrifice readability, navigation clarity, or project comprehension for personality.
- Make project-detail content less informative in order to preserve the playful framing.
- Make the access gate cryptic, overly theatrical, or visually indistinguishable from decorative content.
- Invent unconventional navigation patterns when familiar tabs communicate the structure clearly.

## Decisions

- The Portfolio will use a game-like, colorful, and interactive visual direction.
- It will feel like a small illustrated world or stage rather than a flat, static portfolio.
- Its closest compositional inspiration is a visual novel, potentially using a character or avatar and a lower narrative or informational panel.
- The home will be treated as a stage, not a map.
- The Home will remain brief and act as an introduction, visual frame, and Selected Work selector rather than a long landing page.
- The main desktop Home composition will aim to read as a single scene within a common viewport when reasonable, while allowing overflow whenever needed.
- The direction may use cartoon and pixel language, with pixel styling acting as an accent rather than the universal treatment.
- The first accepted color foundation for exploration is `#F9E6C8` as Background / base, `#2F4048` as Primary / ink, and `#C7674A` as Accent.
- The accent color must not be assumed suitable for small body text; its use requires contrast and contextual validation.
- No derived color scales, secondary colors, semantic colors, states, or alternative themes have been defined.
- The accepted typography direction pairs `VT323` for display and expressive uses with `Source Sans 3` for body copy, UI, metadata, controls, and sustained reading.
- `VT323` will not be used as the universal typeface for extended informational content.
- These color and typography choices are foundations for visual exploration, not a complete Design System or final token architecture.
- Navigation will follow familiar tab logic: top tabs on desktop and bottom tabs on mobile.
- Theme switching is planned and may receive a diegetic visual expression, but it must remain a recognizable control.
- Projects will be presented as cards.
- Project cards may use short, purposeful motion or media previews when they add value.
- Project details will prioritize clear, informative records, blocks, or panels.
- Restricted cases will use an access gate whose visual expression belongs to the portfolio world without obscuring its function.
- Mobile will adapt the scene rather than reproduce the desktop composition literally.
- Strong personality must coexist with clarity, usability, readability, and professional credibility.
- The visual positioning will primarily reinforce AI-assisted prototyping, design systems, and implementation within Product Design / UX/UI.
- The direction will avoid corporate templates, generic minimalism, excessive neon, sprite saturation, arbitrary gimmicks, and experimentalism that harms usability.

## Experiments

The following areas may be explored without treating the outcome as a decision until explicitly evaluated:

- Different interpretations of the illustrated stage or small-world framing.
- The role and visual presence of a character, avatar, or simple figure.
- Ways for a lower text box or panel to support narrative and information.
- Compact desktop compositions that preserve the Home as one scene while degrading gracefully into scroll.
- The balance between cartoon language and pixel accents.
- Purposeful animated or video previews inside project cards.
- Surface treatments for cards, records, and informational panels.
- Diegetic but recognizable expressions for theme switching.
- Access-gate treatments that feel integrated without becoming cryptic.
- Responsive adaptations that preserve the stage concept on smaller screens.

Specific experiments, hypotheses, evaluation criteria, and results: TBD.

## Open questions

- Which specific visual references and anti-references should anchor the direction?
- Which additional colors and semantic roles are required by real interface needs?
- What alternative theme, if any, should be defined?
- What typography scale, sizes, line heights, Source Sans 3 weights, and responsive type rules should be used?
- What spacing scale, density targets, grid, and responsive breakpoints should be used?
- What exact surface, border, radius, and layering language best supports the concept?
- How should illustration, screenshots, photography, video, cartoon, and pixel treatments relate to one another?
- What exact anatomy and interaction states should project cards use?
- How should multiple Selected Work cards be presented on mobile?
- What visual styling and state treatment should tabs, buttons, and actions use?
- What iconography style and source should be adopted?
- How prominent should the character or avatar be, and what role should it play?
- How should the visual-novel text panel behave and what information should it contain?
- How should the theme switch be expressed visually, including themes, iconography, and transition?
- How should the access gate look while remaining simple, accessible, and clearly functional?
- What motion language, timing, reduced-motion behavior, and performance limits should apply?
- What accessibility compliance target and detailed validation criteria should guide the design?
- What state colors, component decisions, and final tokens will be required once the interface is designed?
