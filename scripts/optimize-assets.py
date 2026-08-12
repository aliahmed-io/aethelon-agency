from pathlib import Path

from PIL import Image


SOURCE_DIR = Path("/home/ubuntu/webdev-static-assets/commerce-studio-optimized")


def main() -> None:
    for source in sorted(SOURCE_DIR.glob("work*.png")):
        with Image.open(source) as image:
            image = image.convert("RGB")
            destination = source.with_suffix(".webp")
            image.save(destination, "WEBP", quality=82, method=6)
            print(f"{source.name} -> {destination.name}: {source.stat().st_size} -> {destination.stat().st_size}")


if __name__ == "__main__":
    main()
