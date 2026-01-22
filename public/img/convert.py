import os
from PIL import Image, ImageOps
from pillow_heif import register_heif_opener

# Register HEIC opener
register_heif_opener()

QUALITY = 80          # tweak as needed
METHOD = 6            # 0-6 (6 = best compression, slower)
SKIP_IF_EXISTS = True

current_dir = os.getcwd()

for filename in os.listdir(current_dir):
    name, ext = os.path.splitext(filename)
    ext = ext.lower()

    if ext in [".heic", ".jpg", ".jpeg", ".png"]:
        out_name = f"{name}.webp"

        if SKIP_IF_EXISTS and os.path.exists(out_name):
            # Uncomment if you want to see what got skipped:
            # print(f"Skipping {filename} (already have {out_name})")
            continue

        print(f"Converting {filename}...")

        try:
            img = Image.open(filename)

            # ✅ Fix iPhone/EXIF rotation (this is the key line)
            img = ImageOps.exif_transpose(img)

            # ✅ Keep alpha for PNGs; otherwise convert to RGB
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                img = img.convert("RGBA")
                img.save(out_name, "WEBP", quality=QUALITY, method=METHOD, lossless=False)
            else:
                img = img.convert("RGB")
                img.save(out_name, "WEBP", quality=QUALITY, method=METHOD)

            print(f"Saved {out_name}")

        except Exception as e:
            print(f"Failed to convert {filename}: {e}")

print("Done!")
