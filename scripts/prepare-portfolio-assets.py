from pathlib import Path

from PIL import Image


SOURCE_ROOT = Path("/home/ubuntu/portfolio-sources")
OUTPUT_ROOT = Path("/home/ubuntu/webdev-static-assets/aethelon-portfolio")

ASSETS = {
    "aethelon-sofa": SOURCE_ROOT / "aethelon/public/products/modern_sofa_1.png",
    "aethelon-detail": SOURCE_ROOT / "aethelon/public/products/modern_sofa_2.png",
    "aethelon-table": SOURCE_ROOT / "aethelon/public/products/oak_dining_table.png",
    "novexa-hero-shoe": SOURCE_ROOT / "novexa/public/hero-shoe-clean.png",
    "novexa-collection": SOURCE_ROOT / "novexa/public/men-fashion-clean.png",
    "novexa-lifestyle": SOURCE_ROOT / "novexa/public/lifestyle-about.png",
    "velorum-banner": SOURCE_ROOT / "velorum/public/assets/generated/banner.png",
    "velorum-chrono": SOURCE_ROOT / "velorum/public/assets/products/velorum_chrono_front_black.png",
    "velorum-aviator": SOURCE_ROOT / "velorum/public/assets/products/velorum_aviator_green.png",
}


def optimize(source: Path, destination: Path) -> None:
    with Image.open(source) as image:
        prepared = image.convert("RGB")
        prepared.save(destination, "WEBP", quality=82, method=6)


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    for name, source in ASSETS.items():
        if not source.exists():
            raise FileNotFoundError(source)
        destination = OUTPUT_ROOT / f"{name}.webp"
        optimize(source, destination)
        print(f"{destination}: {source.name}")


if __name__ == "__main__":
    main()
