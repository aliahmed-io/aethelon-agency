# Aethelon image asset inventory

This directory contains source-controlled backup copies of every current `files.manuscdn.com` visual used by the Aethelon site. The files are deliberately stored outside `client/public/`: production continues to use the verified CDN URLs in `shared/projects.ts`, which avoids bundling large static media into the managed web deployment.

The images below were downloaded unchanged from the current production source references on 26 August 2026. They are committed to the private repository to make the site’s visual asset set auditable, portable, and recoverable.

| Repository file | Current production source | Use |
| --- | --- | --- |
| `images/aethelon-hero.webp` | `ZEXKXwKOALbgthhi.webp` | Homepage hero |
| `images/aethelon-work-furniture.webp` | `XsZZDReMXkzYJqct.webp` | Existing Work card |
| `images/aethelon-work-beauty.webp` | `CXgTkRaWpKBdfqDu.webp` | Existing Work card |
| `images/aethelon-work-product.webp` | `JKZekIgRdrtXLoNW.webp` | Existing Work card |
| `images/aethelon-mark.webp` | `iORsRQmAyqEwbyOe.webp` | Aethelon mark |
| `images/aethelon-portfolio-sofa.webp` | `XjsnykjYkwELaHeZ.webp` | Aethelon case-study gallery |
| `images/aethelon-portfolio-lookbook.webp` | `aPkLvUvAoiaSCkBD.webp` | Aethelon case-study gallery |
| `images/aethelon-portfolio-chair.webp` | `xWeXSMfDyBsJzucR.webp` | Aethelon case-study gallery |
| `images/novexa-portfolio-hero-shoe.webp` | `RrLVtFHOEYEZntFV.webp` | Novexa case-study hero |
| `images/novexa-portfolio-editorial-shoe.webp` | `kQIspgJCsnkbBQnL.webp` | Novexa case-study gallery |
| `images/novexa-portfolio-product-shoe.webp` | `VMzMkbifesChbmfA.webp` | Novexa case-study gallery |
| `images/velorum-portfolio-hero.webp` | `UXlwMQudKfmlPDQd.webp` | Velorum case-study hero |
| `images/velorum-portfolio-chrono.webp` | `WVOUBxzxptVDEabu.webp` | Velorum case-study gallery |
| `images/velorum-portfolio-aviator.webp` | `aUxAnUAHNdmxibML.webp` | Velorum case-study gallery |
| `images/aethelon-logo.png` | `XRqcLBzCjMpMLGtV.png` | Aethelon logo source |

When replacing any production image, update both its source URL in `shared/projects.ts` and this inventory. Keep the replacement in this directory, then use the approved project asset-delivery workflow to publish the new production copy.
