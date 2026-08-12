# Asset optimization validation

The desktop Home and Work captures preserved the Paper Signal composition after the route and bundle refactor. The mobile captures also preserved the header, hero typography, hero image crop, archive introduction, and filter layout without horizontal overflow.

The WebP derivatives were successfully created at approximately 203 KB, 111 KB, and 133 KB versus the original 5.3 MB, 4.1 MB, and 4.1 MB PNGs. However, the managed preview returned 404 responses for the new `/manus-storage/*.webp` paths, and Next reported that those paths were not valid images. The optimization must therefore not ship those paths until their runtime availability is confirmed; the safe next action is to restore the verified CDN sources or use a runtime URL that resolves in both preview and deployment.
