// src/lib/attachments.js
export const MAX_FILES = 5;

// Field names Netlify expects: photo, photo-2 ... photo-5
export function appendFiles(formData, files) {
  formData.delete("photo");
  files.forEach((file, index) => formData.set(index === 0 ? "photo" : `photo-${index + 1}`, file));
}
