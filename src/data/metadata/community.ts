import type { ProjectEntry } from "@/lib/types";

export const communityProjects: ProjectEntry[] = [
  {
    slug: "ejc-clubs-2024",
    title: "EJC Clubs 2024",
    summary: "Giant LED clubs that were part of a set backdrop",
    category: "community",
    date: "2024-06-01",
    tags: ["Community", "Workshops", "Education"],
    imagePath: "/src/lib/images/community/EJC clubs.jpg",
    writeUpPath: "/src/content/writeups/community/ejcClubs/ejc-clubs-2024.md",
    featured: false,
  },
  {
    slug: "flowception-dome-slackfest-2025",
    title: "Flowception Dome Slackfest 2025",
    summary: "The first time we used the Flowception dome for a Slackfest event, it was set up as a chill space that people could hang out if the festival was too busy for them",
    category: "community",
    date: "2025-08-01",
    tags: ["Installation", "Community", "Creative Tech"],
    imagePath: "/src/lib/images/community/slackfest2025.jpg",
    writeUpPath: "/src/content/writeups/community/slackfest2025/flowception-dome-slackfest-2025.md",
    featured: false,
  },
  {
    slug: "bjc-2026-led-space",
    title: "BJC 2026 LED Space",
    summary: "An LED space I built for the BJC 2026 festival, I basically created the LED space I would want to spin in.",
    category: "community",
    date: "2026-05-01",
    tags: ["LED", "Interactive", "Community"],
    imagePath: "/src/lib/images/community/BJC LED space.jpg",
    writeUpPath: "/src/content/writeups/community/bjc2026/bjc-2026-led-space.md",
    featured: false,
  },
];
