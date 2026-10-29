// Small, fast versions of site photos (generated into /img/thumbs and /img/wide).
// thumbs: 720x540 card crops (~70 KB). wide: 1600x900 banner crops.
export const thumb = (src = "") => src.replace(/^\/img\/([^/]+\.webp)$/, "/img/thumbs/$1");
export const wide = (name) => `/img/wide/${name}`;
