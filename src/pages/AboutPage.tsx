import { siteConfig } from "@/siteConfig";

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
    <section className="about-page" aria-labelledby="about-title">
      <h1 id="about-title">About / CV</h1>
      <p className="about-summary">{siteConfig.aboutSummary}</p>

      <div className="about-grid">
        <section className="about-panel">
          <h2>Experience</h2>
          <ul className="timeline">
            {experience.map((item) => (
              <li key={item.title}>
                <p className="timeline-period">{item.period}</p>
                <h3>{item.title}</h3>
                <p>{item.details}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-panel">
          <h2>Core Skills</h2>
          <ul className="skills-list">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
