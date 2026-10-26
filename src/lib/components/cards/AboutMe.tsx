import type { ReactNode } from "react";

const AboutMe = ({ imageSrc, blurb }: AboutMeProps) => {
  return (
    <section className="grid items-center gap-5 overflow-hidden rounded-2xl border border-(--line) bg-(--surface) p-5 sm:grid-cols-[minmax(0,1fr)_auto]" aria-label="About me">
      <div>
        <h2 className="m-0 text-2xl font-semibold">About Me</h2>
        <div className="mt-3 whitespace-pre-line text-(--text-muted)">{blurb}</div>
      </div>

      {imageSrc ? <img src={imageSrc} alt="About me" className="h-40 w-40 justify-self-center rounded-full object-cover sm:h-48 sm:w-48 sm:justify-self-end" /> : null}
    </section>
  );
};

export default AboutMe;

interface AboutMeProps {
  imageSrc?: string;
  blurb: ReactNode;
}
