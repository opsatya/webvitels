export type WorkStatus = "Live" | "In build" | "Architecture" | "Prototype";

export type Work = {
  id: string;
  name: string;
  kind: string;
  summary: string;
  detail: string;
  status: WorkStatus;
  stack: string[];
  href?: string;
  /** `tightCrop` keeps only the right-hand area (used to crop marketing copy out of promo art). */
  image?: { src: string; alt: string; position?: string; tightCrop?: boolean };
  note?: string;
};

/**
 * Real projects from the team's local repositories and portfolio.
 * Keep claims to what the code and live sites show; no invented metrics.
 */
export const work: Work[] = [
  {
    id: "xumo",
    name: "Xumo Fitness",
    kind: "Website redesign",
    summary: "A new website for a personal training studio in Vishrantwadi, Pune.",
    detail:
      "We replaced a dated template site with a fast, editorial design: program discovery, Google review proof, a goal-based enquiry flow that hands off to WhatsApp, and a blog. Server-rendered by default, with motion that respects reduced-motion settings.",
    status: "Live",
    stack: ["Next.js", "React", "Tailwind CSS", "Motion"],
    href: "https://xumo-six.vercel.app/",
    image: {
      src: "/images/work/xumo-home.png",
      alt: "Xumo Fitness homepage with the headline Train with purpose over a dark gym photograph",
      position: "0% 30%",
    },
  },
  {
    id: "localkart",
    name: "LocalKart",
    kind: "Our product: mobile apps and API",
    summary: "Customers post what they need. Nearby shops send offers. One tap makes it an order.",
    detail:
      "A hyperlocal commerce platform with a customer app, a shopkeeper app, an admin console and a real-time API. Requests broadcast to nearby shops and expire after 15 minutes; accepting an offer creates an order atomically.",
    status: "In build",
    stack: ["Expo", "React Native", "Express", "MongoDB", "Socket.IO", "Redis"],
    href: "https://github.com/opsatya/localKart",
    image: {
      src: "/images/work/localkart-hero.png",
      alt: "Illustrated neighbourhood of local shops connected by LocalKart: a customer sends a request and a shopkeeper replies with an offer",
      position: "50% 50%",
    },
  },
  {
    id: "fitness-platform",
    name: "Fitness studio platform",
    kind: "Multi-tenant SaaS",
    summary: "Software for gyms to run members, trainers, plans and front desk in one place.",
    detail:
      "An admin web app for owners and staff, a platform console, and a member app with a trainer mode, all sharing one data layer. Each gym gets its own branding and subdomain, and its public website reads from the same API.",
    status: "Architecture",
    stack: ["React", "React Native", "Prisma", "PostgreSQL", "Nx monorepo"],
  },
  {
    id: "legalbridge",
    name: "LegalBridge",
    kind: "Legal transparency platform",
    summary: "Clients see their case status, hearings, documents and invoices without chasing their lawyer.",
    detail:
      "Three roles (admin, lawyer and client) on one API. The first phase is a case status tracker; later phases add document summaries, fee transparency and deadline alerts.",
    status: "In build",
    stack: ["Fastify", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
  },
  {
    id: "algo-trading",
    name: "Cancerian Capital",
    kind: "Algorithmic trading platform",
    summary: "A trading assistant with live chat, market data and authenticated sockets.",
    detail:
      "Built at the TalentFarm.ai hackathon at DYPDPU, where it placed 2nd runner-up. We have since added Clerk authentication and Mongo-backed chat history.",
    status: "Prototype",
    stack: ["React", "Flask", "Socket.IO", "MongoDB", "Clerk"],
    href: "https://algorthim-trading.vercel.app/",
    image: {
      src: "/images/work/screen2.png",
      alt: "Cancerian Capital landing page with a large gradient wordmark",
      position: "50% 40%",
    },
    note: "2nd runner-up, TalentFarm.ai hackathon",
  },
  {
    id: "cinemasync",
    name: "CinemaSync",
    kind: "Real-time web app",
    summary: "Watch parties where playback stays in sync for everyone in the room.",
    detail:
      "Room codes, shared playlists and synchronised playback over WebSockets. The backend was recently migrated to Node and Express with client tests added.",
    status: "Prototype",
    stack: ["React", "Node.js", "Express", "Socket.IO"],
    href: "https://github.com/opsatya/cinemaSync",
    image: {
      src: "/images/work/screen5.png",
      alt: "CinemaSync home screen with a room code field and a Join room button",
      position: "0% 20%",
    },
  },
];

export const workById = (id: string) => {
  const w = work.find((x) => x.id === id);
  if (!w) throw new Error(`Unknown work id: ${id}`);
  return w;
};
