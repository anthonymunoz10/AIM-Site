// src/lib/compressImage.js
//
// Shrinks phone photos in the browser before upload, so customers never hit
// the upload size limit. Large photos are resized to fit within MAX_DIM and
// re-saved as JPEG. PDFs and files the browser can't decode are returned
// unchanged.

const MAX_DIM = 2000; // longest side in px; plenty for reviewing a job photo
const QUALITY = 0.82;
const SKIP_BELOW = 900 * 1000; // already-small images are left as-is

async function decode(file) {
  // createImageBitmap honors EXIF rotation where supported (iOS 16+, Chrome)
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      /* fall through to <img> decode */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function isImageFile(file) {
  return file.type.startsWith("image/") || /\.(jpe?g|png|heic|heif|webp)$/i.test(file.name);
}

export async function compressImage(file) {
  if (!isImageFile(file) || file.type === "image/gif") return file;
  if (file.size <= SKIP_BELOW && /^image\/(jpeg|png|webp)$/.test(file.type)) return file;

  let source;
  try {
    source = await decode(file);
  } catch {
    return file; // browser can't read it (e.g. HEIC on some desktops): send original
  }

  const w = source.width;
  const h = source.height;
  if (!w || !h) return file;
  const scale = Math.min(1, MAX_DIM / Math.max(w, h));
  const cw = Math.round(w * scale);
  const ch = Math.round(h * scale);

  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff"; // transparent PNGs become white, not black
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(source, 0, 0, cw, ch);
  if (typeof source.close === "function") source.close();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", QUALITY));
  if (!blob || blob.size >= file.size) return file;

  const base = file.name.replace(/\.[^.]+$/, "") || "photo";
  return new File([blob], `${base}.jpg`, { type: "image/jpeg", lastModified: Date.now() });
}
