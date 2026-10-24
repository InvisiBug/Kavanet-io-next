import { siteConfig } from "@/lib/data/siteData";

const experience = [
  {
    company: "Sky Betting & Gaming",
    imageSrc: "https://media.licdn.com/dms/image/v2/C4E0BAQENnxhTEshiSg/company-logo_400_400/company-logo_400_400/0/1674744112511/sky_betting_and_gaming_logo?e=1794441600&v=beta&t=VZ_mYwvLA0bnI2sPVGYzxh0fsh9XpJLFGaTQZvsKmHg",
    entries: [
      {
        period: "2020 - 2025",
        title: "Software Engineer",
        location: "Leeds",
        details:
          "Created a React interface for tenants to control their smart energy system.\n Created a backend application and API written using express to provide a link between the React app and real world SCADA system.\n Provided technical support to the end user.\n Assembled and managed ubiquity networking gear.\n Purchased and programmed industrial logic controllers",
      },
    ],
  },
  {
    company: "Core Control Solutions",
    imageSrc: "https://media.licdn.com/dms/image/v2/C4E0BAQErkPB4fV2KWw/company-logo_400_400/company-logo_400_400/0/1678467847183/core_control_solutions_ltd_logo?e=1794441600&v=beta&t=Hpoh4yH0Yz6d5D5CcXsHZGoo_8GpHkbT4eurPliETok",
    entries: [
      {
        period: "2019 - 2020",
        title: "Senior Project Engineer",
        location: "Nottingham",
        details:
          "Created a React interface for tenants to control their smart energy system.\n Created a backend application and API written using express to provide a link between the React app and real world SCADA system.\n Provided technical support to the end user.\n Assembled and managed ubiquity networking gear.\n Purchased and programmed industrial logic controllers",
      },
    ],
  },
  {
    company: "RWE AG",
    imageSrc: "https://media.licdn.com/dms/image/v2/C4D0BAQHcUAokOSCKEg/company-logo_100_100/company-logo_100_100/0/1630568485840/rwe__logo?e=1794441600&v=beta&t=ykAL48aywo2YU-2GACHx9CComLIRyfWSSFoRpGLYtgo",
    entries: [
      {
        title: "Graduate",
        period: "2015 - 2017",
        location: "Staythorpe",
        details: "Building product prototypes, simulation tools, and infrastructure experiments with a focus on reliable delivery.",
      },
      {
        period: "2015 - 2017",
        title: "Placement Student",
        location: "Staythorpe Power Station",
        details:
          "Repaired and optimised a building wide HVAC system saving electricity and maintenance costs. \n Optimised a water treatment process to reduce product hold time between stages as well as plant component total starts and operating times. \nNegotiated with vendors to ensure the most cost effective solutions while coordinating contractors to carry out the implementation \n Achieved project management certification \n2 years experience with the boiler water purification process utilizing reverse osmosis and mixed bed ion exchange technology.",
      },
    ],
  },
  {
    company: "RWE npower",
    imageSrc: "https://media.licdn.com/dms/image/v2/C560BAQF4HIUkMxALEQ/company-logo_400_400/company-logo_400_400/0/1630672845524/npower__logo?e=1794441600&v=beta&t=TW4Mvok1ecAW20Vr0y6aSldo3s5L3ghYzBlV0oUNQXc",
    entries: [
      {
        period: "2008 - 2012",
        title: "Technical Apprentice",
        location: "Didcot A power station",
        details: "Vocational learning across engineering and operations, from on-site manufacturing practice to classroom-based technical study.",
      },
    ],
  },
];

const skills = ["TypeScript and React", "System design and modeling", "Automation and developer tooling", "Technical writing and communication"];

const skillBadgeSections = [
  {
    title: "Stuff I work with in my day to day",
    badges: [
      { label: "React", src: "https://img.shields.io/badge/React-20232a?&logo=react&logoColor=61DAFB" },
      { label: "Redux", src: "https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff" },
      { label: "New Relic", src: "https://img.shields.io/badge/NewRelic-1CE783?&logo=newrelic&logoColor=white" },
      { label: "TypeScript", src: "https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" },
      { label: "Node.js", src: "https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=fff" },
    ],
  },
  {
    title: "Languages I use",
    badges: [
      { label: "TypeScript", src: "https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" },
      { label: "JavaScript", src: "https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" },
      { label: "Python", src: "https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff" },
      { label: "SQL", src: "https://img.shields.io/badge/SQL-336791?logo=postgresql&logoColor=fff" },
    ],
  },
];

export function AboutPage() {
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

          <div className="mt-4 grid gap-5">
            {skillBadgeSections.map((section) => (
              <section key={section.title}>
                <h3 className="m-0 mb-2 text-sm  text-(--text)">{section.title}</h3>

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
}
