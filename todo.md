# Final release checklist

- [x] Define three additional honest case studies with distinct industries and service types.
- [x] Expand the Work archive and gallery mapping without fabricating client proof or results.
- [x] Verify filter combinations, case-study routes, galleries, forms, dark mode, and responsive layouts.
- [x] Run final type checking and production build.
- [x] Save the final stable checkpoint and deliver it.

## Interaction update

- [x] Add a subtle editorial hover treatment to Work-page case-study cards.
- [x] Implement a custom editorial 404 page with a homepage escape route.
- [x] Add a sticky Back to Top control for long case-study pages.
- [x] Verify responsive behavior, reduced-motion behavior, and production build.
- [x] Save and deliver the updated checkpoint.

## Responsive overflow fix

- [x] Identify the element causing horizontal overflow at narrow widths.
- [x] Apply a responsive layout fix without weakening the editorial design.
- [x] Verify the affected routes at narrow and desktop viewports.
- [x] Run the final build and save the fix checkpoint.

## Next.js migration

- [x] Audit the current Vite/React entry points and map them to App Router files.
- [x] Add the Next.js package, scripts, config, and App Router shell.
- [x] Migrate the site component, styles, forms, theme, galleries, and 404 behavior.
- [x] Verify all routes, responsive behavior, type checking, and Next.js production build.
- [x] Save and deliver the Next.js migration checkpoint.

## Final idiomatic Next.js migration

- [x] Audit hybrid routes, image usage, legacy files, and dependencies.
- [x] Replace wouter navigation with native App Router route segments and client navigation.
- [x] Convert all site image tags to optimized next/image usage with remote image configuration.
- [x] Remove legacy Vite entry points, configs, server scaffolding, and unused dependencies.
- [x] Apply final metadata, accessibility, performance, and error-boundary improvements.
- [x] Run full checks, production build, route smoke tests, and save the final checkpoint.

## Knowledge hub and SEO expansion

- [x] Gather authoritative evidence and source URLs for the requested ecommerce subjects.
- [x] Write one substantial article for each requested feature and include citations plus honest implementation caveats.
- [x] Build a Paper Signal topic taxonomy and filterable blog index inspired by the supplied reference, without copying it.
- [x] Add native App Router blog index and article routes with metadata and structured content.
- [x] Implement technical SEO foundations: metadata, canonical URLs, robots, sitemap, JSON-LD, internal links, and share previews.
- [x] Verify blog filtering, article routes, mobile layout, dark mode, accessibility, type checking, and production build.
- [x] Save and deliver the knowledge hub checkpoint plus the SEO plan.

## Landing page repair

- [x] Inspect the landing route and current runtime/build errors.
- [x] Identify and fix the specific homepage break without regressing the editorial layout.
- [x] Verify the landing page at desktop and mobile widths.
- [x] Run the production build and save the repair checkpoint.

## GitHub export

- [x] Verify the authenticated GitHub owner and whether `aethelon-agency` already exists.
- [x] Create or reuse the private `aethelon-agency` repository.
- [x] Commit the completed Commerce Studio project and push the final checkpoint.
- [x] Verify the remote repository URL and pushed default branch.

## International pricing correction

- [x] Reframe pricing around international remote delivery rather than Egypt-local purchasing power.
- [x] Recalculate founding-client and standard prices in USD without an Egypt-local discount.
- [x] Add communication, accent, timezone, and trust-building recommendations for online delivery.
- [x] Update the Ask Phill comparison and pricing report with the corrected assumptions.

## Location-flexible positioning correction

- [x] Replace Egypt-based wording with location-independent, remote-first positioning.
- [x] Note current Saudi Arabia context and future Southern Europe move without making either location the brand identity.
- [x] Update pricing-report language for timezone, invoicing, and client-facing location disclosure.

## Solo-freelancer pricing recalibration

- [x] Set prices around one-person capacity and three-to-four-week delivery windows.
- [x] Replace agency-scale project prices with accessible founding and standard freelancer prices.
- [x] Define strict scope, revision, integration, and post-launch boundaries for the shorter delivery model.
- [x] Update and deliver the pricing report with the revised ladder.

## User pricing package revision

- [x] Replace the current service ladder with the user’s two-price package structure.
- [x] Set AI, AR, and feature additions to $300 founding / $500 standard.
- [x] Set standard custom ecommerce to $1,500 founding / $2,000 standard.
- [x] Set complete growth ultra all-included ecommerce to $2,500 founding / $4,000 standard.
- [x] Set 10-hour retainers to $200 founding / $300 standard with maintenance and hot-fix support included.
- [x] Set 20-hour retainers to $300 founding / $500 standard with maintenance and hot-fix support included.
- [x] Mark strategy sprints, store audits, improvement plans, and supporting documents as included free when needed.

## Client-pitch pricing deck

- [x] Prepare concise slide content for the final service packages and pricing.
- [x] Generate the deck in a premium Paper Signal editorial style.
- [x] Deliver the finished presentation file to the user.

## Performance improvement pass

- [x] Profile the current Lighthouse bottlenecks and establish a baseline for startup, LCP, payload, and interaction latency.
- [x] Optimize the critical rendering path, images, fonts, CSS, and JavaScript without changing the visual system.
- [x] Make Work and Insights filtering/sorting instantaneous and stable.
- [x] Re-run production build, Lighthouse, responsive checks, and visual parity verification.
- [x] Document the final performance changes, remaining constraints, and next steps.

## Performance implementation

- [x] Remove root-level dynamic rendering and narrow the shared client boundary.
- [x] Split Insights summaries from full article bodies and reduce archive payload.
- [x] Replace blocking font CSS, optimize the hero LCP image, and add responsive image sizes.
- [x] Remove first-paint animation cost and tune archive prefetch/filter behavior.
- [x] Validate build, bundle/payload changes, Lighthouse metrics, and visual parity.

## Aggressive performance pass

- [x] Profile actual route-change latency, image request failures, and the latest Lighthouse gaps.
- [x] Create and run a reproducible Python image-conversion pipeline with runtime-safe output URLs.
- [x] Reduce unused route JavaScript and add an instant-feeling App Router transition without hiding loading work.
- [x] Tune Next.js image delivery, preloading, responsive sizes, and cache behavior.
- [x] Validate navigation, image loading, Lighthouse-style metrics, visual quality, type checking, and production build.

## Aethelon brand, backend, and measurement upgrade

- [x] Rename the public brand from Commerce Studio to Aethelon across UI, metadata, structured data, sitemap, robots, and contact copy.
- [x] Upgrade the project with a real server-backed submission path for contact and newsletter forms.
- [x] Add validation, persistence, abuse-resistant handling, and clear success/error states for both forms.
- [x] Add repeatable production bundle analysis and identify the heaviest remaining client dependencies.
- [x] Reduce avoidable shared JavaScript without changing the Paper Signal visual system or interactions.
- [x] Run and document a Lighthouse audit against the local production build because no active public deployment is currently available.
- [x] Re-run Lighthouse against the published Aethelon URL after the project is published (not required by the user; local production audit retained).
- [x] Run type checking, production build, and route/form smoke tests for the completed upgrade.
- [x] Save a new checkpoint for the completed Aethelon upgrade.
- [x] Commit and push the completed Aethelon upgrade to the private GitHub repository.

## Aethelon editorial transition system

- [x] Define a shared, transform-and-opacity-only transition foundation that never delays route rendering.
- [x] Implement distinct Signal Arrival, Archive Slide, Blueprint Fold, Editorial Turn, Index Scan, Stamp Close, Gallery Shutter, and Misprint route variants.
- [x] Verify the dedicated Archive Slide motion on the Work archive at desktop and mobile widths.
- [x] Preserve reduced-motion support and accessibility without blocking focus, navigation, or page content.
- [x] Verify transitions across desktop and mobile routes, then run tests and production build.
- [x] Complete and verify the transition-system implementation.
- [x] Save a new checkpoint that includes the Aethelon editorial transition system and runtime verifier.
- [x] Commit and push the transition-system changes to the private GitHub repository.

## Transition timing refinement

- [x] Increase the shared Aethelon route-transition duration by 200 ms without delaying route rendering.
- [x] Verify the longer motion remains smooth, reduced-motion-safe, and production-build compatible.
- [x] Exercise the extended transition through real desktop and mobile navigation without delaying route rendering.
- [x] Re-verify the reduced-motion behavior after the timing refinement.
- [x] Save the timing-refinement checkpoint.
- [ ] Push the timing-refinement update to the private GitHub repository.
