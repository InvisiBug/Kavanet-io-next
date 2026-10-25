import { siteConfig, experience, skills, skillBadgeSections } from "@/data";

const AboutPage = () => {
  return (
    <section className="grid gap-4" aria-labelledby="about-title">
      <h1 id="about-title">About / CV</h1>
      <p className="mt-0 text-(--text-muted)">{siteConfig.aboutSummary}</p>

      <div className="grid gap-4 grid-cols-[2fr_1fr] max-[920px]:grid-cols-1">
        <section className="rounded-2xl border border-(--line) bg-(--surface) p-5">
          <h2>Experience</h2>

          <ul className="mt-4 grid gap-4 list-none p-0">
            {experience.map((job) => (
              <li key={job.company} className="rounded-xl border border-(--line) bg-(--surface-soft) p-4">
                <div className="flex items-start gap-4">
                  {job.imageSrc ? <img src={job.imageSrc} alt={`${job.company} logo`} className="h-14 w-14 rounded-md border border-(--line) bg-white object-contain p-1" loading="lazy" /> : null}
                  <h3 className="m-0 leading-tight ">{job.company}</h3>
                </div>

                <ul className="mt-3 grid gap-3 list-none p-0">
                  {job.entries.map((entry) => (
                    <li key={`${entry.title}-${job.company}-${entry.period}`} className="rounded-lg border border-(--line) bg-(--surface) p-3">
                      <p className="m-0 text-[1.05rem] text-(--text)">{entry.title}</p>

                      <div className="flex items-start ml-4">
                        <div className="min-w-0">
                          <p className="m-0 text-(--text)">{entry.period}</p>
                          <p className="mt-0 mb-2 text-(--text)">{entry.location}</p>

                          <div>
                            <p className="m-0 whitespace-pre-line text-(--text-muted)">{entry.details}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
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

          <div className="mt-5 grid gap-5">
            <h2>Badges</h2>

            {skillBadgeSections.map((section) => (
              <section key={section.title}>
                <h3 className="m-0 mb-2 text-lg  text-(--text)">{section.title}</h3>

                <div className="grid grid-cols-5 gap-2 sm:grid-cols-5">
                  {section.badges.map((badge) => (
                    <img key={`${section.title}-${badge.label}`} src={badge.src} className="min-h-5" alt={`${badge.label} badge`} loading="lazy" />
                  ))}
                </div>
              </section>
            ))}
          </div>
          {/* <img src={skillBadges[0]} alt={`${skills[0]} logo`} loading="lazy" /> */}
        </section>
      </div>
    </section>
  );
};

export default AboutPage;
