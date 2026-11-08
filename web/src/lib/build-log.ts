/**
 * Real commit messages from the team's repositories (git log, Oct 2026).
 * Refresh by hand, or replace with a build-time fetch from the GitHub API.
 */
export type Commit = { project: string; date: string; message: string };

export const buildLog: Commit[] = [
  { project: "LocalKart", date: "2026-10-24", message: "feat(api): customer-readable delivery code on order detail" },
  { project: "LocalKart", date: "2026-10-24", message: "feat(customer): order tracking timeline, orders and requests tabs, reorder" },
  { project: "LocalKart", date: "2026-10-24", message: "fix(customer): remaining contrast fixes (placeholder, danger tint, marigold on tint)" },
  { project: "LocalKart", date: "2026-10-24", message: "feat(customer): onboarding, location rationale, account deletion" },
  { project: "Xumo Fitness", date: "2026-10-07", message: "Shipped: new site live with program discovery and WhatsApp enquiry flow" },
  { project: "CinemaSync", date: "2026-10-02", message: "Fix critical playlist bugs and add missing dev test dependencies" },
  { project: "Cancerian Capital", date: "2026-10-01", message: "Fix ChatInterface socket contract to match Flask events" },
  { project: "Cancerian Capital", date: "2026-09-30", message: "Require Clerk auth on Socket.IO connections and persist live chat" },
  { project: "CinemaSync", date: "2026-09-30", message: "Migrate backend to Node/Express server, add client tests" },
];

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
