"use client";

import { motion, MotionConfig, type HTMLMotionProps } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fade + rise. Used for the hero load sequence and the build log only;
 * the rest of the page renders without entrance motion on purpose.
 */
export function Reveal({
  delay = 0,
  y = 20,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.7, ease: EASE, delay }}
        {...props}
      />
    </MotionConfig>
  );
}
