// src/entry-server.jsx
//
// Build-time only. Renders each page to plain HTML (see scripts/prerender.mjs)
// so search engines and AI tools that don't run JavaScript can still read it.
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { createHead, UnheadProvider, renderSSRHead } from "@unhead/react/server";
import AppRoutes from "./AppRoutes.jsx";

export async function render(url) {
  const head = createHead();
  const html = renderToString(
    <UnheadProvider value={head}>
      <StaticRouter location={url}>
        <AppRoutes location={{ pathname: url, search: "", hash: "", state: null, key: "ssr" }} />
      </StaticRouter>
    </UnheadProvider>
  );
  const tags = await renderSSRHead(head);
  return { html, headTags: tags.headTags };
}
