import { experience, skillBadgeSections, workExperienceImageSrc, workExperienceSummary, education } from "@/data";
import { AboutMeCard, ExperienceDetails } from "@/lib/components";

const AboutPage = () => {
  return (
    <section className="grid gap-4" aria-labelledby="about-title">
      <AboutMeCard imageSrc={workExperienceImageSrc} blurb={workExperienceSummary} />

      <div className="flex flex-col  md:flex-row gap-4">
        <div className="order-last flex min-w-0 flex-[6_1_0%] flex-col md:order-0">
          {/* Employment History */}
          <section className="rounded-2xl border border-(--line) bg-(--surface) p-5">
            <h1 className={"text-2xl font-semibold"}>Employment History</h1>

            <ul className="mt-4 grid gap-4 list-none p-0">
              {experience.map((job) => (
                <li key={job.company} className="rounded-xl border border-(--line) bg-(--surface-soft) p-4">
                  <div className="flex items-center gap-4">
                    {job.imageSrc ? <img src={job.imageSrc} alt={`${job.company} logo`} className="h-14 w-14 rounded-md  border-(--line)  object-contain " loading="lazy" /> : null}
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

                            <ExperienceDetails details={entry.details} />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          {/* Education & Training */}
          <section className="mt-5 rounded-2xl border border-(--line) bg-(--surface) p-5">
            <h1 className={"text-2xl font-semibold"}>Education & Training</h1>

            <ul className="mt-4 grid gap-4 list-none p-0">
              {education.map((job) => (
                <li key={job.company} className="rounded-xl border border-(--line) bg-(--surface-soft) p-4">
                  <div className="flex items-center gap-4">
                    {job.imageSrc ? <img src={job.imageSrc} alt={`${job.company} logo`} className="h-14 w-14 rounded-md  border-(--line)  object-contain " loading="lazy" /> : null}
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

                            <ExperienceDetails details={entry.details} />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Badges */}
        <div className="h-fit self-start rounded-2xl border border-(--line) bg-(--surface) p-5  grid gap-5 order-first min-w-0 flex-[3_1_0%] md:order-0">
          {skillBadgeSections.map((section) => (
            <div key={section.title}>
              <h3 className="m-0 mb-2 text-center text-lg text-(--text) font-bold">{section.title}</h3>

              <div className="flex flex-wrap justify-evenly gap-1">
                {section.badges.map((badge) => (
                  <img key={`${section.title}-${badge.label}`} src={badge.src} className="min-h-5 " alt={`${badge.label} badge`} loading="lazy" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
