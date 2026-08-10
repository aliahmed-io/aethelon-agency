# Commerce Studio — Design Direction

## Three possible directions

### Theme Name: Paper Signal
Very light editorial surfaces, oversized modern typography, and one sharp orange signal color. The studio feels like a fashion-tech publication that happens to ship exceptional commerce systems.
**Probability:** 0.07

### Theme Name: Quiet Systems
A restrained monochrome interface with diagrammatic structure, precise metadata, and almost architectural spacing. The emotional intent is calm authority and engineering confidence.
**Probability:** 0.04

### Theme Name: Night Lab
A dark experimental canvas with electric acid accents, kinetic product objects, and a more immersive AI/3D mood. This makes the studio feel like a technology lab, but is intentionally less approachable for commerce operators.
**Probability:** 0.06

## Chosen approach: Paper Signal

### Design Movement
Contemporary editorial art direction blended with Swiss modernism and independent digital product studio restraint.

### Core Principles
1. **Editorial scale:** headlines are compositions, not labels; type can occupy the full width and create the page rhythm.
2. **Proof over posture:** selected experiments, actual capabilities, technical metadata, and transparent outcomes replace borrowed authority.
3. **Signal, not decoration:** one ownable orange accent marks action, emphasis, and motion without washing the whole site in color.
4. **Directness:** the writing is confident, specific, and human; the layout gives the studio a point of view without pretending to be a large agency.

### Color Philosophy
Warm paper (#F3F0E8) makes the studio feel tactile and considered. Ink (#171717) gives the work the visual authority of print. Signal orange (#FF5A1F) is used sparingly for decisions, not atmosphere: links, active states, small markers, and the occasional high-energy section. A muted sage-gray supports technical content without becoming a second accent.

### Layout Paradigm
Asymmetrical editorial bands with offset columns, oversized type, and full-bleed visual moments. Content alternates between left-anchored narrative and right-anchored technical detail; large case-study cards break the page into visual chapters instead of uniform grids.

### Signature Elements
- A small orange signal dot and route-like micro-labels that appear at section entrances.
- Tall, index-like project numbers and thin rules that make the site feel archived and intentional.
- Product-swatch and configurator interactions that turn the website into a small commerce demonstration.

### Interaction Philosophy
Interactions should feel like handling a well-made object: quick, tactile, and useful. Hover states reveal more context, accordions expose depth, filters change the work without a full page reload, and every CTA leads somewhere meaningful. Motion is used to guide attention, not to perform.

### Animation
Use short ease-out reveals, staggered by 40–70ms for grouped content. Case studies lift and shift their image crop on hover. Service rows expand with opacity and translate transitions rather than height animation where possible. The hero visual has a very slow cursor-responsive drift. Respect `prefers-reduced-motion` by removing parallax, reveal transforms, and hover motion while preserving state changes and focus clarity.

### Typography System
Display: **Space Grotesk**, 600–700, tight tracking for hero and section headlines. Body: **DM Sans**, 400–500, for readable project descriptions and form copy. Metadata: DM Sans, 600, uppercase, 0.14em tracking. Display headings use clamp-based sizing and compressed line-height; body copy stays between 1.45 and 1.65 line-height.

### Brand Essence
**Independent commerce engineering for brands that want agency-grade thinking without agency overhead.**
Personality: precise, curious, unshowy.

### Brand Voice
Headlines are short and decisive. CTAs sound like an invitation to make something specific, not a generic funnel. Microcopy names the next step and removes uncertainty.

Example lines:
- “Your store can be more useful than a grid of products.”
- “Bring the hard part. I’ll bring the system.”

### Wordmark & Logo
Use a compact `CS/` monogram built from two offset brackets and a central orange signal dot. The wordmark is set in Space Grotesk with a custom slash separator, never as a default logo lockup.

### Signature Brand Color
**Signal Orange — #FF5A1F.** It is energetic enough to suggest experimentation, but warm enough to stay grounded in commerce and conversation.

## Content decisions

The initial portfolio will use clearly labeled self-initiated concepts and experiments rather than invented clients, metrics, testimonials, or awards. Pricing will be presented as “starting from” placeholders until actual prices are supplied. The contact form will work as a local, honest inquiry flow with a clear confirmation state rather than pretending to send email through a backend that does not exist in the static project.
