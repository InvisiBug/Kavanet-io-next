import { siteConfig } from "@/lib/data/siteData";

const experience = [
  {
    period: "2024 - Present",
    title: "Independent Developer",
    details: "Building product prototypes, simulation tools, and infrastructure experiments with a focus on reliable delivery.",
  },
  {
    period: "2021 - 2024",
    title: "Community Contributor",
    details: "Led workshops, created onboarding resources, and contributed code and docs to open-source teams.",
  },
];

const skills = ["TypeScript and React", "System design and modeling", "Automation and developer tooling", "Technical writing and communication"];

export function AboutPage() {
  return (
    <section className="grid gap-4" aria-labelledby="about-title">
      <h1 id="about-title">About / CV</h1>
      <p className="mt-0 text-(--text-muted)">{siteConfig.aboutSummary}</p>

      <div className="grid gap-4 grid-cols-[2fr_1fr] max-[920px]:grid-cols-1">
        <section className="rounded-2xl border border-(--line) bg-(--surface) p-5">
          <h2>Experience</h2>
          <ul className="mt-4 pl-4">
            {experience.map((item) => (
              <li key={item.title} className="not-first:mt-4">
                <p className="m-0 text-[0.9rem] font-bold text-(--accent)">{item.period}</p>
                <h3 className="mt-1 mb-0">{item.title}</h3>
                <p className="text-(--text-muted)">{item.details}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-(--line) bg-(--surface) p-5">
          <h2>Core Skills</h2>
          <ul className="mt-4 pl-4">
            {skills.map((skill) => (
              <li key={skill} className="text-(--text-muted)">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
