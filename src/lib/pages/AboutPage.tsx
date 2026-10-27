import { experience, skillBadgeSections, workExperienceImageSrc, workExperienceSummary } from "@/data";
import { AboutMeCard } from "@/lib/components";

const AboutPage = () => {
  return (
    <section className="grid gap-4" aria-labelledby="about-title">
      <AboutMeCard imageSrc={workExperienceImageSrc || undefined} blurb={workExperienceSummary} />

      <div className="grid gap-4 grid-cols-[2fr_1fr] max-[920px]:grid-cols-1">
        <section className="rounded-2xl border border-(--line) bg-(--surface) p-5">
          <h2>Experience</h2>

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

        <section className="h-fit self-start rounded-2xl border border-(--line) bg-(--surface) p-5">
          <div className="mt-5 grid gap-5">
            {skillBadgeSections.map((section) => (
              <section key={section.title}>
                <h3 className="m-0 mb-2 text-lg text-(--text)">{section.title}</h3>

                <div className="flex flex-wrap">
                  {section.badges.map((badge) => (
                    <img key={`${section.title}-${badge.label}`} src={badge.src} className="min-h-5 mr-1 mb-1" alt={`${badge.label} badge`} loading="lazy" />
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

const ExperienceDetails = ({ details }: { details: string }) => {
  if (!details.includes("*")) {
    return <p className="m-0 whitespace-pre-line text-(--text-muted)">{details}</p>;
  }

  const blocks: Array<{ type: "text" | "bullets"; content: string[] }> = [];

  for (const rawLine of details.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    if (line.startsWith("*")) {
      const bullets = line
        .split("*")
        .map((bullet) => bullet.trim())
        .filter(Boolean);
      const previousBlock = blocks[blocks.length - 1];

      if (previousBlock?.type === "bullets") {
        previousBlock.content.push(...bullets);
      } else {
        blocks.push({ type: "bullets", content: bullets });
      }
    } else {
      blocks.push({ type: "text", content: [line] });
    }
  }

  return (
    <div className="text-(--text-muted)">
      {blocks.map((block, blockIndex) =>
        block.type === "text" ? (
          <p key={`text-${blockIndex}`} className="mt-0 mb-2 whitespace-pre-line">
            {block.content[0]}
          </p>
        ) : (
          <ul key={`bullets-${blockIndex}`} className="mt-2 mb-2 grid gap-1 list-disc pl-5">
            {block.content.map((bullet, bulletIndex) => (
              <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
};

export default AboutPage;
