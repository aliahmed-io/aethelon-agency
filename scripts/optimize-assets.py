"""Create runtime-safe, visually equivalent image derivatives for Commerce Studio.

The script never overwrites source assets. It writes WebP derivatives outside the
application directory so they can be uploaded through the managed asset workflow.
Use `--source` and `--output` to point it at a different asset workspace.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


DEFAULT_SOURCE = Path("/home/ubuntu/webdev-static-assets")
DEFAULT_OUTPUT = Path("/home/ubuntu/webdev-static-assets/commerce-studio-optimized-v2")
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
TARGETS = {
    "paper-signal-hero": 2400,
    "selected-work-01": 1800,
    "selected-work-02": 1800,
    "selected-work-03": 1800,
    "cs-monogram": 256,
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--quality", type=int, default=84)
    return parser.parse_args()


def find_sources(source_root: Path) -> dict[str, Path]:
    candidates: dict[str, Path] = {}
    for path in source_root.rglob("*"):
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS:
            stem = path.stem.lower()
            if stem.endswith("_original"):
                continue
            key = stem.replace(" ", "-").replace("_", "-")
            candidates.setdefault(key, path)

    aliases = {
        "paper-signal-hero": ("paper-signal-hero", "hero-optimized"),
        "selected-work-01": ("selected-work-01", "work1"),
        "selected-work-02": ("selected-work-02", "work2"),
        "selected-work-03": ("selected-work-03", "work3"),
        "cs-monogram": ("cs-monogram",),
    }
    resolved: dict[str, Path] = {}
    for output_name, names in aliases.items():
        for name in names:
            if name in candidates:
                resolved[output_name] = candidates[name]
                break
    return resolved


def prepare_image(source: Path, max_width: int) -> Image.Image:
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        if image.width > max_width:
            ratio = max_width / image.width
            image = image.resize((max_width, round(image.height * ratio)), Image.Resampling.LANCZOS)
        return image.copy()


def save_derivative(image: Image.Image, destination: Path, quality: int) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    has_alpha = image.mode in {"RGBA", "LA"} or "transparency" in image.info
    if has_alpha:
        image = image.convert("RGBA")
    else:
        image = image.convert("RGB")
    image.save(destination, "WEBP", quality=quality, method=6, lossless=False)


def main() -> None:
    args = parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    sources = find_sources(args.source)
    if not sources:
        raise SystemExit(f"No image sources found under {args.source}")

    for name, source in sources.items():
        image = prepare_image(source, TARGETS[name])
        destination = args.output / f"{name}.webp"
        save_derivative(image, destination, args.quality)
        print(
            f"{name}: {source.name} {source.stat().st_size:,} bytes -> "
            f"{destination.name} {destination.stat().st_size:,} bytes "
            f"({image.width}x{image.height})"
        )


if __name__ == "__main__":
    main()
