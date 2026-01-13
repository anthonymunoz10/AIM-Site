import os
from PIL import Image
from pillow_heif import register_heif_opener

# Register HEIC opener
register_heif_opener()

# Get current directory
current_dir = os.getcwd()

# Loop through all files
for filename in os.listdir(current_dir):
    name, ext = os.path.splitext(filename)
    ext = ext.lower()

    # Check if it's an image we want to convert
    if ext in ['.heic', '.jpg', '.jpeg', '.png']:
        print(f"Converting {filename}...")

        try:
            # Open image
            img = Image.open(filename)

            # Convert to RGB (in case of PNG transparency or HEIC color modes)
            img = img.convert('RGB')

            # Save as WebP
            img.save(f"{name}.webp", "WEBP", quality=80)
            print(f"Saved {name}.webp")

        except Exception as e:
            print(f"Failed to convert {filename}: {e}")

print("Done!")