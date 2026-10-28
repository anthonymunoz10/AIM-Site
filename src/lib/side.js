// Which side of AIM a page belongs to (drives the Commercial / Residential switch).
export function sideForPath(pathname) {
  if (pathname.startsWith("/residential")) return "residential";
  if (pathname.startsWith("/services")) return "commercial";
  return null;
}
