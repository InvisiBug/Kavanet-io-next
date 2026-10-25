import type { ProjectEntry } from "@/lib/types";

export const communityProjects: ProjectEntry[] = [
  {
    slug: "ejc-clubs-2024",
    title: "EJC Clubs 2024",
    summary: "Community club sessions and hands-on workshops delivered throughout the 2024 program.",
    category: "community",
    date: "2024-06-01",
    imagePath: "/src/lib/images/community/ejc-clubs-2024.svg",
    tags: ["Community", "Workshops", "Education"],
    featured: true,
    contentPath: "/src/content/writeups/community/ejcClubs/ejc-clubs-2024.md",
  },
  {
    slug: "flowception-dome-slackfest-2025",
    title: "Flowception Dome Slackfest 2025",
    summary: "An interactive community installation combining visuals, sound, and collaborative live controls.",
    category: "community",
    date: "2025-08-01",
    imagePath: "/src/lib/images/community/flowception-dome-slackfest-2025.svg",
    tags: ["Installation", "Community", "Creative Tech"],
    contentPath: "/src/content/writeups/community/slackfest2025/flowception-dome-slackfest-2025.md",
  },
  {
    slug: "bjc-2026-led-space",
    title: "BJC 2026 LED Space",
    summary: "A large-scale LED environment project for BJC 2026 with programmable zones and reactive patterns.",
    category: "community",
    date: "2026-05-01",
    imagePath: "/src/lib/images/community/bjc-2026-led-space.svg",
    tags: ["LED", "Interactive", "Community"],
    contentPath: "/src/content/writeups/community/bjc2026/bjc-2026-led-space.md",
  },
];
