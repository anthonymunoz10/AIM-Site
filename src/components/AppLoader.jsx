import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AppLoader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] grid place-items-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
        >
          <div className="w-[min(560px,86vw)]">
            {/* top line */}
            <div className="flex items-center justify-between">
              <div className="text-white/70 text-xs font-extrabold uppercase tracking-[0.24em]">
                AIM Construction Management
              </div>
              <div className="text-white/40 text-xs font-bold uppercase tracking-[0.22em]">
                Loading
              </div>
            </div>

            {/* progress bar “feel” (indeterminate) */}
            <div className="mt-5 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-1/3 bg-[var(--brand-orange)]"
                initial={{ x: "-120%" }}
                animate={{ x: "320%" }}
                transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
              />
            </div>

            {/* subtitle */}
            <div className="mt-4 text-white/55 text-sm font-semibold">
              Preparing the experience…
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
