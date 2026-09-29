// netlify/functions/submission-created/submission-created.mjs
//
// Netlify runs this automatically every time a website form is submitted
// (the file name "submission-created" is what hooks it to that event).
// It emails a clean, branded lead notification to the company inbox.
//
// Required Netlify environment variables (Site configuration → Environment variables):
//   GMAIL_USER          aimconstructionmgt@gmail.com
//   GMAIL_APP_PASSWORD  16-character Google "app password" for that account
// Optional:
//   LEAD_NOTIFY_TO      where to send leads (defaults to GMAIL_USER)

import nodemailer from "nodemailer";
import { LOGO_PNG_BASE64, LOGO_WIDTH, LOGO_HEIGHT } from "./email-logo.mjs";

const ORANGE = "#F08A00";
const INK = "#0B0F14";
const SITE = "https://aimconstructionmgt.com";
const LOGO_CID = "aim-logo@aimconstructionmgt.com";
const FILE_FIELDS = ["photo", "photo-2", "photo-3", "photo-4", "photo-5"];

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const digits = (v) => String(v ?? "").replace(/[^\d+]/g, "");

function prettyPhone(v) {
  const d = String(v ?? "").replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return String(v ?? "");
}

// Netlify stores an uploaded file either as a URL string or as
// {url, filename, type, size}. Only http(s) URLs are ever put in the email.
function fileUrl(v) {
  const url = typeof v === "string" ? v : v?.url;
  return typeof url === "string" && /^https?:\/\//i.test(url) ? url : "";
}

function toAttachment(v) {
  const url = fileUrl(v);
  if (!url) return null;
  let name = typeof v === "object" && v?.filename ? String(v.filename) : "";
  if (!name) {
    try {
      name = decodeURIComponent(new URL(url).pathname.split("/").pop() || "");
    } catch {
      name = "";
    }
  }
  const mime = typeof v === "object" && v?.type ? String(v.type) : "";
  const isPdf = mime === "application/pdf" || /\.pdf$/i.test(name);
  const isImage = mime.startsWith("image/") || /\.(jpe?g|png|gif|webp|heic|heif)$/i.test(name);
  return { url, name, kind: isPdf ? "PDF" : isImage ? "Image" : "File" };
}

/** Normalize either form (contact / residential-quote) into one lead shape. */
export function toLead(formName, data = {}) {
  const residential =
    formName === "residential-quote" ||
    String(data.side || "").toLowerCase() === "residential";

  return {
    side: residential ? "Residential" : "Commercial",
    source: formName === "residential-quote" ? "Residential estimate form" : "Contact form",
    name: (data.name || "").trim() || "Website visitor",
    email: (data.email || "").trim(),
    phone: (data.phone || "").trim(),
    where: (data.address || data.location || "").trim(),
    projectType: (data["project-type"] || "").trim(),
    timeline: (data.timeline || "").trim(),
    message: (data.message || "").trim(),
    attachments: FILE_FIELDS.map((key) => toAttachment(data[key])).filter(Boolean),
  };
}

function button(href, label, primary) {
  const bg = primary ? ORANGE : "#ffffff";
  const fg = primary ? "#ffffff" : INK;
  const border = primary ? ORANGE : "#d9dde3";
  return `<td style="padding:0 8px 8px 0;">
    <a href="${esc(href)}" style="display:inline-block;background:${bg};color:${fg};border:1px solid ${border};border-radius:999px;padding:11px 20px;font:700 13px/1 Arial,Helvetica,sans-serif;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;">${esc(label)}</a>
  </td>`;
}

function row(label, valueHtml) {
  if (!valueHtml) return "";
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #eef0f3;width:120px;vertical-align:top;font:700 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#8a9099;">${esc(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #eef0f3;vertical-align:top;font:600 15px/1.45 Arial,Helvetica,sans-serif;color:${INK};">${valueHtml}</td>
  </tr>`;
}

export function renderLeadEmail(lead, receivedAt = new Date()) {
  const when = receivedAt.toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const tel = digits(lead.phone);
  const replySubject = `Re: your ${lead.projectType || "project"} request - AIM Construction Management`;
  const mapsUrl = lead.where
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.where)}`
    : "";

  const buttons = [
    tel && button(`tel:${tel}`, "Call", true),
    tel && button(`sms:${tel}`, "Text", false),
    lead.email && button(`mailto:${lead.email}?subject=${encodeURIComponent(replySubject)}`, "Email", false),
  ]
    .filter(Boolean)
    .join("");

  const details = [
    row("Phone", tel ? `<a href="tel:${esc(tel)}" style="color:${INK};text-decoration:none;">${esc(prettyPhone(lead.phone))}</a>` : ""),
    row("Email", lead.email ? `<a href="mailto:${esc(lead.email)}" style="color:${INK};">${esc(lead.email)}</a>` : ""),
    row(lead.side === "Residential" ? "Address" : "Location", lead.where ? `<a href="${esc(mapsUrl)}" style="color:${INK};">${esc(lead.where)}</a>` : ""),
    row("Project", esc(lead.projectType)),
    row("Timeline", esc(lead.timeline)),
  ].join("");

  const attachments = lead.attachments || [];
  const attachmentRows = attachments
    .map((a, i) => {
      const label = a.name || `Attachment ${i + 1}`;
      return `<tr><td style="padding:0 0 8px;">
        <a href="${esc(a.url)}" style="display:block;border:1px solid #e3e6ea;border-radius:10px;padding:12px 14px;text-decoration:none;">
          <span style="display:inline-block;min-width:44px;text-align:center;background:${a.kind === "PDF" ? "#B23B2E" : "#3A5A8C"};color:#ffffff;border-radius:6px;padding:4px 6px;font:700 10px/1 Arial,Helvetica,sans-serif;letter-spacing:.1em;text-transform:uppercase;vertical-align:middle;">${esc(a.kind)}</span>
          <span style="padding-left:10px;font:600 14px/1.4 Arial,Helvetica,sans-serif;color:${INK};vertical-align:middle;word-break:break-all;">${esc(label)}</span>
          <span style="float:right;font:700 12px/22px Arial,Helvetica,sans-serif;color:${ORANGE};">Open &rarr;</span>
        </a>
      </td></tr>`;
    })
    .join("");
  const photo = attachments.length
    ? `<tr><td style="padding:22px 28px 0;">
        <div style="font:700 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#8a9099;padding-bottom:8px;">Photos &amp; plans (${attachments.length})</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${attachmentRows}</table>
      </td></tr>`
    : "";

  const sideColor = lead.side === "Residential" ? "#2F7D5B" : "#3A5A8C";

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New lead</title></head>
<body style="margin:0;padding:0;background:#f2f3f5;">
  <div style="display:none;max-height:0;overflow:hidden;">${esc(lead.side)} lead from ${esc(lead.name)}${lead.projectType ? " - " + esc(lead.projectType) : ""}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f3f5;">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="540" cellpadding="0" cellspacing="0" style="width:100%;max-width:540px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e3e6ea;">

        <tr><td style="background:${INK};padding:20px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td><a href="${SITE}" style="text-decoration:none;"><img src="cid:${LOGO_CID}" alt="AIM Construction" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" style="display:block;width:${LOGO_WIDTH}px;height:${LOGO_HEIGHT}px;border:0;color:#ffffff;font:800 18px Arial,Helvetica,sans-serif;text-decoration:none;" /></a></td>
            <td align="right"><span style="display:inline-block;background:${sideColor};color:#ffffff;border-radius:999px;padding:6px 12px;font:700 11px/1 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;">${esc(lead.side)}</span></td>
          </tr></table>
        </td></tr>
        <tr><td style="height:4px;background:${ORANGE};line-height:4px;font-size:0;">&nbsp;</td></tr>

        <tr><td style="padding:26px 28px 6px;">
          <div style="font:700 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:${ORANGE};">New lead</div>
          <div style="padding-top:6px;font:800 26px/1.2 Arial,Helvetica,sans-serif;color:${INK};">${esc(lead.name)}</div>
          ${lead.projectType ? `<div style="padding-top:4px;font:600 15px/1.4 Arial,Helvetica,sans-serif;color:#5b626c;">${esc(lead.projectType)}${lead.where ? " &middot; " + esc(lead.where) : ""}</div>` : ""}
        </td></tr>

        ${buttons ? `<tr><td style="padding:16px 28px 4px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>${buttons}</tr></table></td></tr>` : ""}

        <tr><td style="padding:10px 28px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${details}</table>
        </td></tr>

        ${lead.message ? `<tr><td style="padding:22px 28px 0;">
          <div style="font:700 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#8a9099;padding-bottom:8px;">Message</div>
          <div style="background:#f7f8fa;border-left:4px solid ${ORANGE};border-radius:8px;padding:14px 16px;font:500 15px/1.6 Arial,Helvetica,sans-serif;color:${INK};white-space:pre-wrap;">${esc(lead.message)}</div>
        </td></tr>` : ""}

        ${photo}

        <tr><td style="padding:26px 28px 24px;">
          <div style="border-top:1px solid #eef0f3;padding-top:14px;font:500 12px/1.5 Arial,Helvetica,sans-serif;color:#8a9099;">
            Received ${esc(when)} ET via the ${esc(lead.source.toLowerCase())} on <a href="${SITE}" style="color:#8a9099;">aimconstructionmgt.com</a>.
            ${lead.email ? "Hit reply to answer the customer directly." : ""}
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `New ${lead.side.toLowerCase()} lead: ${lead.name}`,
    lead.projectType && `Project: ${lead.projectType}`,
    lead.phone && `Phone: ${prettyPhone(lead.phone)}`,
    lead.email && `Email: ${lead.email}`,
    lead.where && `Location: ${lead.where}`,
    lead.timeline && `Timeline: ${lead.timeline}`,
    lead.message && `\n${lead.message}`,
    ...attachments.map((a, i) => `${a.kind} ${i + 1}: ${a.name ? a.name + " - " : ""}${a.url}`),
  ]
    .filter(Boolean)
    .join("\n");

  const subject = `New ${lead.side} lead: ${lead.name}${lead.projectType ? " - " + lead.projectType : ""}`;

  return { subject, html, text };
}

export const handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body || "{}").payload || {};
  } catch {
    return { statusCode: 400, body: "Bad payload" };
  }

  const formName = payload.form_name || payload.data?.["form-name"] || "";
  if (!["contact", "residential-quote"].includes(formName)) {
    return { statusCode: 200, body: "Ignored" };
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD not set; lead email not sent.");
    return { statusCode: 200, body: "Email not configured" };
  }

  const lead = toLead(formName, payload.data || {});
  const { subject, html, text } = renderLeadEmail(
    lead,
    payload.created_at ? new Date(payload.created_at) : new Date()
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"AIM Website" <${user}>`,
    to: process.env.LEAD_NOTIFY_TO || user,
    replyTo: lead.email ? `"${lead.name.replace(/"/g, "")}" <${lead.email}>` : undefined,
    subject,
    text,
    html,
    attachments: [
      {
        filename: "aim-logo.png",
        content: Buffer.from(LOGO_PNG_BASE64, "base64"),
        contentType: "image/png",
        cid: LOGO_CID,
        contentDisposition: "inline",
      },
    ],
  });

  return { statusCode: 200, body: "Sent" };
};
