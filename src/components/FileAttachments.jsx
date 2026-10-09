// src/components/FileAttachments.jsx
// Shared "add photos or plans" box: up to 5 photos/PDFs, photos auto-shrunk,
// 7 MB total. Used by the contact form and the residential estimate form.
import React, { useEffect, useRef } from "react";
import { compressImage, isImageFile } from "../lib/compressImage.js";

export default function FileAttachments({ files, setFiles, fileError, setFileError, compressing, setCompressing }) {
  // always read the latest list after the async photo shrink finishes
  const filesRef = useRef(files);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  return (
    <>
        <label className="mt-4 flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-white/20 bg-white/[0.03] px-4 py-4 transition hover:border-[var(--brand-orange)]">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white/80">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M9 3 7.2 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.2L15 3H9Zm3 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
              />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block text-[14px] font-extrabold text-white">
              {files.length ? `Add more files (${files.length} of 5)` : "Add photos or plans (optional)"}
            </span>
            <span className="block text-[13px] font-semibold text-white/50">
              {compressing ? "Preparing photos…" : "Up to 5 photos or PDFs · large photos are resized automatically"}
            </span>
          </span>
          <input
            multiple
            disabled={compressing}
            type="file"
            accept="image/*,application/pdf"
            className="sr-only"
            onChange={async (e) => {
              const picked = Array.from(e.target.files || []);
              e.target.value = "";
              if (!picked.length || compressing) return;
              if (files.length + picked.length > 5) {
                setFileError("You can attach up to 5 files. Remove a file before adding more.");
                return;
              }
              if (picked.some((file) => !isImageFile(file) && file.type !== "application/pdf" && !/\.pdf$/i.test(file.name))) {
                setFileError("Please choose photos or PDF plans.");
                return;
              }
              setFileError("");
              setCompressing(true);
              // shrink phone photos in the browser so they fit the upload limit
              const ready = await Promise.all(picked.map((file) => compressImage(file).catch(() => file)));
              setCompressing(false);
              const next = [...filesRef.current, ...ready];
              if (next.length > 5) {
                setFileError("You can attach up to 5 files. Remove a file before adding more.");
                return;
              }
              if (next.reduce((total, file) => total + file.size, 0) > 7000000) {
                setFileError("These files are too large to send together (usually large PDFs). Remove one, or email big plans to aimconstructionmgt@gmail.com.");
                return;
              }
              setFiles(next);
            }}
          />
        </label>
        {files.length > 0 && (
          <ul className="mt-3 grid gap-2">
            {files.map((file, index) => {
              const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
              return (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] py-1 pl-3 pr-1"
                >
                  <span
                    className={[
                      "shrink-0 rounded-md px-1.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white",
                      isPdf ? "bg-[#B23B2E]" : "bg-[#3A5A8C]",
                    ].join(" ")}
                  >
                    {isPdf ? "PDF" : "Image"}
                  </span>
                  <span className="min-w-0 flex-1 whitespace-normal [overflow-wrap:anywhere] text-[14px] font-semibold text-white/85">
                    {file.name}
                  </span>
                  <span className="hidden shrink-0 text-[12px] font-semibold text-white/40 sm:inline">
                    {file.size < 1000000
                      ? `${Math.max(1, Math.round(file.size / 1000))} KB`
                      : `${(file.size / 1000000).toFixed(1)} MB`}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => {
                      setFiles(files.filter((_, i) => i !== index));
                      setFileError("");
                    }}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white transition"
                  >
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {fileError && (
          <div
            role="alert"
            className="mt-3 flex flex-wrap items-center gap-x-3 rounded-xl border border-[rgba(240,138,0,0.45)] bg-[rgba(240,138,0,0.10)] px-4 py-3 text-[14px] font-semibold text-orange-100"
          >
            <span className="min-w-0 flex-1">{fileError}</span>
            <button
              type="button"
              className="min-h-11 font-extrabold underline decoration-white/40"
              onClick={() => setFileError("")}
            >
              OK
            </button>
          </div>
        )}
    </>
  );
}
