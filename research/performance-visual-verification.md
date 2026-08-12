# Performance visual verification

## Desktop — 1280px

- The Home hero still renders the warm-paper hero image, stamp, caption, typography, and split layout correctly.
- The Work archive headline, navigation state, and editorial spacing remain intact.
- The Insights archive headline and orange emphasis remain intact.

## Mobile — 390px

- The mobile header collapses correctly to the compact menu treatment.
- The Home hero keeps the intended type hierarchy, action row, and image transition without horizontal overflow.
- Work filters wrap within the viewport and preserve their editorial spacing.
- The Insights topic pills remain visible and usable at the first viewport.

## Performance observations

- The optimized routes returned successfully after the bundle and archive changes.
- The managed preview reported route responses around 1.7 seconds during concurrent screenshot capture; this is server/preview latency and should not be confused with the browser’s warm interaction target.
- No visual regression was observed in the representative desktop or mobile captures.
