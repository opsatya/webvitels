"use client";

import { cn } from "cn";
import { useEffect, useState } from "react";
import type { Metric } from "web-vitals";

type Key = "LCP" | "INP" | "CLS" | "FCP" | "TTFB";
type Rating = Metric["rating"];
type Reading = { value: number; rating: Rating };

/** Google's published thresholds (good, poor). https://web.dev/articles/vitals */
const METRICS: {
  key: Key;
  name: string;
  what: string;
  good: number;
  poor: number;
  unit: "ms" | "";
  waiting: string;
}[] = [
  { key: "LCP", name: "Largest Contentful Paint", what: "How fast the main content appears", good: 2500, poor: 4000, unit: "ms", waiting: "Measuring" },
  { key: "INP", name: "Interaction to Next Paint", what: "How fast the page responds to you", good: 200, poor: 500, unit: "ms", waiting: "Tap anywhere to measure" },
  { key: "CLS", name: "Cumulative Layout Shift", what: "How much the layout jumps around", good: 0.1, poor: 0.25, unit: "", waiting: "Measuring" },
  { key: "FCP", name: "First Contentful Paint", what: "When anything first appears", good: 1800, poor: 3000, unit: "ms", waiting: "Measuring" },
  { key: "TTFB", name: "Time to First Byte", what: "How fast the server answers", good: 800, poor: 1800, unit: "ms", waiting: "Measuring" },
];

const ratingLabel: Record<Rating, string> = {
  good: "Good",
  "needs-improvement": "Needs work",
  poor: "Poor",
};

const ratingColor: Record<Rating, string> = {
  good: "bg-pass",
  "needs-improvement": "bg-warn",
  poor: "bg-fail",
};

function format(value: number, unit: "ms" | "") {
  if (unit === "") return value.toFixed(2);
  return value >= 1000 ? `${(value / 1000).toFixed(2)} s` : `${Math.round(value)} ms`;
}

/**
 * Live Core Web Vitals for the current page, measured with Google's
 * `web-vitals` library in the visitor's own browser. Nothing is sent anywhere.
 */
export function VitalsMonitor({ className }: { className?: string }) {
  const [readings, setReadings] = useState<Partial<Record<Key, Reading>>>({});

  useEffect(() => {
    let cancelled = false;
    const report = (m: Metric) => {
      if (cancelled) return;
      setReadings((r) => ({ ...r, [m.name]: { value: m.value, rating: m.rating } }));
    };
    import("web-vitals").then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
      const opts = { reportAllChanges: true };
      onLCP(report, opts);
      onINP(report, opts);
      onCLS(report, opts);
      onFCP(report, opts);
      onTTFB(report, opts);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const passing = METRICS.filter((m) => readings[m.key]?.rating === "good").length;
  const measured = METRICS.filter((m) => readings[m.key]).length;

  return (
    <figure
      className={cn(
        "flex flex-col rounded-xl border bg-white shadow-[0_1px_0_rgb(15_26_23/0.04),0_24px_48px_-24px_rgb(15_26_23/0.18)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">This page, right now</p>
          <p className="text-sm text-muted-foreground">Measured in your browser as you read</p>
        </div>
        <p className="shrink-0 text-right text-sm" aria-live="polite">
          {measured === 0 ? (
            <span className="text-muted-foreground">Measuring</span>
          ) : (
            <>
              <span className="font-display text-2xl font-semibold tracking-tight">{passing}</span>
              <span className="text-muted-foreground"> of {measured} good</span>
            </>
          )}
        </p>
      </div>

      <ul className="flex flex-col divide-y">
        {METRICS.map((m) => {
          const r = readings[m.key];
          const max = m.poor * 1.5;
          const pos = r ? Math.min(r.value / max, 1) : 0;
          return (
            <li key={m.key} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2.5 px-5 py-3.5 sm:px-6">
              <div className="min-w-0">
                <p className="text-[0.9375rem] font-medium">
                  <abbr title={m.name} className="no-underline">
                    {m.key}
                  </abbr>
                  <span className="ml-2 font-normal text-muted-foreground max-xl:hidden">{m.what}</span>
                </p>
              </div>
              <p className="text-right text-[0.9375rem] font-semibold tabular-nums">
                {r ? (
                  <>
                    {format(r.value, m.unit)}
                    <span className="sr-only">, {ratingLabel[r.rating]}</span>
                  </>
                ) : (
                  <span className="font-normal text-muted-foreground">{m.waiting}</span>
                )}
              </p>

              {/* Threshold track: good / needs work / poor zones at Google's cut-offs */}
              <div aria-hidden className="relative col-span-2 h-1.5">
                <div className="absolute inset-0 flex overflow-hidden rounded-full">
                  <span className="bg-pass/25" style={{ width: `${(m.good / max) * 100}%` }} />
                  <span className="bg-warn/25" style={{ width: `${((m.poor - m.good) / max) * 100}%` }} />
                  <span className="flex-1 bg-fail/20" />
                </div>
                <span
                  className={cn(
                    "absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white transition-[left,opacity,background-color] duration-700 ease-out-quint",
                    r ? ratingColor[r.rating] : "bg-foreground/20 opacity-0",
                  )}
                  style={{ left: `${pos * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <figcaption className="border-t px-5 py-3.5 text-[0.8125rem] leading-snug text-muted-foreground sm:px-6">
        {measured < METRICS.length
          ? "Readings arrive as the page loads. "
          : "All five measured. "}
        Zones use Google&apos;s thresholds. Nothing is sent to us.
      </figcaption>
    </figure>
  );
}
