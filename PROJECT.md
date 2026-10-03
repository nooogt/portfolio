# Portfolio — Project Context

## Project overview

Portfolio is a deliberately small personal professional portfolio within Prototype Factory. It presents Belén's professional profile and selected work without becoming a long marketing landing page.

Its initial information architecture is:

```text
Portfolio
├── Home
│   ├── professional introduction
│   ├── framing / stage
│   ├── navigation
│   ├── theme switch
│   └── Selected Work
├── Project Detail
│   └── case study / project file
└── Restricted Access
    └── access gate before selected Project Details
```

This is a conceptual product architecture, not a route map or technical implementation plan.

The project-specific architecture remains separated as follows:

- `PROJECT.md`: what is being built.
- `visual-direction.md`: how this product should look and feel.
- `design/`: future visual source of truth created through the official Pencil workflow.
- `app/`: future React implementation; this directory does not exist yet.

## Purpose

Present Belén's professional profile and selected projects, with an emphasis on AI-assisted prototyping, design systems, and implementation within a broader Product Design / UX/UI practice.

## Portfolio goals

- Present the professional profile clearly and concisely.
- Showcase selected projects and work.
- Demonstrate the problem, contribution, decisions, outputs, impact, or learning relevant to each case study.
- Establish a distinctive identity without compromising professional clarity.
- Support direct access to public cases and controlled access to restricted cases.
- Validate the visual direction in Pencil during a later stage.
- Translate the validated design into a real React implementation during a later stage.

## Target audience

TBD.

The access model anticipates people who may receive the shared credential through Belén's CV, but the primary and secondary audience segments have not yet been explicitly defined.

## Primary user journeys

```text
Home → Public Project → Project Detail
```

```text
Home → Restricted Project → Access Gate → Project Detail
```

When an appropriate public repository exists for Prototype Factory:

```text
Home → Prototype Factory → GitHub
```

The broader restricted-access journey is:

```text
CV → shared credential → Portfolio → Restricted Case → Access Gate → Project Detail
```

No additional primary journeys are defined yet.

## Scope

The initial product scope includes:

- A brief Home that introduces Belén and establishes the portfolio experience.
- Professional name, role, and principal areas of practice.
- Conventional navigation expressed through tabs.
- A planned theme switch.
- A Selected Work area that links to project cases.
- Initial consideration of Rampet, Conexcom, and Prototype Factory as projects.
- Public Project Details that open directly.
- Restricted Project Details protected by an access gate.
- One shared credential for all restricted cases.
- A session experience intended to avoid repeated credential entry during the same visit.
- Informative case studies containing only the sections and media relevant to each project.
- Optional project-specific external resources, including a possible GitHub action for Prototype Factory when an appropriate repository is available.

The current work remains documentation-only. Design, prototyping, and implementation are later stages.

## Out of scope

For the current documentation stage:

- Final copy.
- Final screen layouts or UI design.
- Component or design-system creation.
- Pencil file creation or editing.
- React initialization or implementation.
- Authentication or session implementation.
- A real password or credential value.
- Backend services, CMS, databases, or external providers.
- Deployment configuration.
- Confirming public or restricted status for any specific project.
- Confirming GitHub availability or URLs.

The Portfolio is not intended to become a long landing page with many personal-marketing sections, a complex game, or a fully gamified experience.

## Content structure

### Home

The Home is brief and serves three main purposes:

1. Present Belén professionally.
2. Establish the portfolio's visual universe.
3. Provide access to selected work.

Initial planned content:

```text
BELÉN

Product Designer

UI · Systems · Prototyping


SELECTED WORK

[RAMPET]

[CONEXCOM]

[PROTOTYPE FACTORY]
```

The exact copy remains subject to revision.

The reference at `https://mchiu.co.uk/` informs only structural economy and content restraint. Its identity and visual design are not references to copy.

### Selected Work

Initial projects under consideration:

- Rampet.
- Conexcom.
- Prototype Factory.

Each project card must communicate at least:

- project name;
- relevant areas or disciplines;
- an action to enter the case study;
- access status when applicable.

Exact copy, metadata, card anatomy, and public/restricted classification remain TBD.

### Project Detail

A Project Detail is an informative case study or project file. Potential content includes:

- project overview;
- context;
- problem;
- role;
- scope;
- responsibilities;
- process;
- decisions;
- design;
- design system;
- tokens;
- prototyping;
- implementation;
- visual evidence;
- screenshots;
- videos;
- results;
- impact;
- learnings.

This is a content inventory, not a mandatory template. Each case study must include only what is relevant to that project and should clearly explain:

- what problem existed;
- what Belén did;
- what decisions she made;
- what she produced;
- what impact or learning resulted.

### Case-study media

Case studies may combine text with screenshots, short videos, small montages, interaction previews, system captures, tokens, components, prototypes, and implementation evidence.

Media must provide evidence or help explain the work. For example, a short edited video of a token system should be accompanied by context describing what was created, why it was needed, Belén's role, the problem it solved, and the result.

### External resources

A project may provide an additional external action when useful. Prototype Factory may expose both `CASE STUDY` and `GITHUB ↗` if a suitable repository is available.

- Case Study explains the professional problem, process, decisions, and results.
- GitHub provides technical, structural, or implementation evidence available for inspection.

External resources are optional and project-specific.

## Functional requirements

- Provide access from Home to Selected Work.
- Support public and restricted case-study types.
- Open a public case directly from its project card.
- Route a restricted case through an access gate before revealing its Project Detail.
- Use one shared credential across all restricted projects.
- Tell visitors simply that the credential is included in Belén's CV.
- Never expose the real credential in project documentation.
- After successful validation, avoid asking for the credential again immediately when another restricted case is opened during the same visit.
- Provide a theme switch.
- Allow project-specific external actions such as GitHub when a valid destination exists.
- Keep Case Study and GitHub as distinct actions with distinct purposes.
- Present only relevant content in each Project Detail rather than enforcing every possible case-study section.

The technical strategy for credential validation, session storage, expiration, security, and theme behavior remains TBD.

## Interaction requirements

- Navigation must follow familiar, immediately understandable patterns.
- Desktop navigation uses tabs in the upper area.
- Mobile navigation uses tabs in the lower area.
- The Home may use a character, stage, informational panel, and small interactive elements, but essential content must not be hidden behind difficult interactions.
- The game or visual-novel metaphor is experiential framing, not a requirement for complex gamification.
- Project cards provide a clear action to enter the case study and communicate restricted status when applicable.
- Media or motion in project cards should preview or explain the work rather than decorate it arbitrarily.
- The access gate must clearly identify the restricted case, request the shared credential, explain that it is included in the CV, and communicate success or failure understandably.
- Theme switching must be available, but its exact behavior, persistence, iconography, and transitions remain TBD.
- External links must be distinguishable from navigation to the internal Case Study.

Exact navigation labels, tab count, card interactions, access-gate states, and copy remain TBD.

## Responsive requirements

- Desktop uses upper tab navigation.
- Mobile uses lower tab navigation.
- On desktop, the Home should read as a compact scene whose principal content fits within a common viewport when reasonably possible.
- Single-viewport presentation is a compositional intention, not a rigid technical constraint.
- Vertical overflow must remain available for shorter viewports, browser zoom, accessibility preferences, unavoidable content growth, and other responsive conditions.
- Mobile must adapt responsively without forcing all Home content into one screen height or reproducing the desktop composition literally.
- Project Details must remain clearly legible at every supported size.
- Expressive elements should adapt, simplify, or reflow before content or controls are compressed or impaired.

The exact breakpoints and the mobile pattern for presenting multiple project cards remain TBD.

## Accessibility considerations

- Playful identity must not make simple tasks difficult.
- Navigation and labels must be understandable.
- Text, controls, states, and focus indicators must have sufficient contrast.
- Informational content must remain legible and easy to scan.
- Keyboard focus must be visible.
- Controls must be recognizable and communicate their state.
- Motion must not be required to understand information.
- Reduced-motion preferences must be supported where motion is used.
- The access gate must be comprehensible and provide clear instructions and feedback.
- Restricted status must not depend on color or motion alone.
- Content and controls must tolerate browser zoom and responsive reflow.

Detailed compliance targets and validation criteria remain TBD.

## Copy / language rules

Exact Portfolio language, voice, and tone remain TBD.

Known copy requirements:

- The Home copy should remain concise.
- Project cards need clear project, discipline, access-state, and case-study labels.
- The access gate must state simply that the credential is included in Belén's CV.
- External actions must distinguish the Case Study from GitHub.
- Restricted projects should be described as restricted-access cases, not completely private projects.

## Design-system strategy

The design-system strategy remains TBD and must be defined after visual exploration and before reusable UI foundations are created.

Future design work must account for coherent, accessible states for:

- navigation tabs;
- theme switching;
- project cards and access status;
- buttons and external actions;
- access-gate inputs, instructions, validation, and feedback;
- project-detail information surfaces;
- motion and reduced-motion alternatives.

This list defines future product needs, not final components. Project-specific decisions must remain inside `projects/portfolio/` unless later proven reusable across projects and explicitly promoted.

## Pencil source

- Official Pencil source: `projects/portfolio/design/portfolio.pen`.
- The file has been created through Pencil/pen.dev and is the project-specific visual source of truth.
- It currently contains the accepted foundations and the first exploratory desktop Home composition.

## React implementation

- Intended future location: `projects/portfolio/app/`.
- The `app/` directory has not been created.
- React has not been initialized.
- Implementation decisions are deferred until the visual direction has been designed and validated in Pencil.
- Framework, architecture, tooling, rendering strategy, deployment, theme implementation, access validation, and session management: TBD.

## Technical constraints

- Follow the global Prototype Factory rules and methodology.
- Keep `sandbox/` exclusively as a testing laboratory; do not use it as the Portfolio project source.
- Keep Portfolio-specific knowledge inside `projects/portfolio/`.
- Do not assume a backend, CMS, database, identity provider, or other external service.
- Do not expose the real shared credential in documentation or client-visible source decisions.
- Do not select a validation, storage, expiration, or security strategy before the implementation phase.
- Do not assume every project has a public repository or external destination.
- Do not treat the single-viewport Home intention as a fixed-height implementation requirement.

## Decisions

- The product is a deliberately small personal professional portfolio.
- It will present Belén's profile and selected work without becoming a long marketing landing page.
- Its initial architecture consists of Home, Project Detail, and Restricted Access.
- Home functions as a presentation, visual framing experience, and work selector.
- Initial Selected Work consideration includes Rampet, Conexcom, and Prototype Factory.
- Projects are accessed through cards and may be public or restricted.
- Restricted cases use an access gate and one shared credential distributed through Belén's CV.
- A successful credential validation should carry across restricted cases during the same visit without immediate re-entry.
- Project Details prioritize clear, project-specific professional storytelling rather than a mandatory universal template.
- Case-study media must provide evidence or explain the work.
- Navigation uses upper tabs on desktop and lower tabs on mobile.
- A theme switch is planned.
- The desktop Home aims to behave as a compact, single-scene composition when reasonable, while retaining overflow when needed.
- Mobile may adapt rather than reproduce the desktop composition literally.
- Prototype Factory may include a separate GitHub action if an appropriate repository exists.
- Case Study and GitHub serve different purposes.
- Visual direction will be designed and validated in Pencil before React implementation.

## Open questions

- Who are the primary and secondary audiences?
- What final copy, language, voice, and tone should the Portfolio use?
- What are the final navigation labels and number of tabs?
- Which projects will be public and which will be restricted?
- What exact metadata and copy should each project card contain?
- What card anatomy and mobile Selected Work pattern should be designed?
- What content order should each individual case study use?
- What are the exact theme options and functional behavior?
- How will theme preference be persisted, if at all?
- What technical mechanism will validate the shared credential?
- How will an unlocked session be stored, scoped, secured, and expired?
- What access-gate states and copy are required?
- Which projects will expose external resources?
- Will Prototype Factory have a suitable public GitHub repository, and what will its URL be?
- What accessibility compliance target should apply?
- What will the official Pencil file be named?
- Which React framework, architecture, and tooling will be used?
- How and where will the Portfolio be deployed?
