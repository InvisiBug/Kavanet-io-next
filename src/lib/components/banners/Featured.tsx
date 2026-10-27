const HeroFeatured = ({ children, masonary = false }: HeroFeaturedProps) => {
  return (
    <section
      className="rounded-[1.2rem] bg-(--surface) border border-(--line) bg-[linear-gradient(145deg,rgba(255,127,0,0.08),transparent_42%),var(--surface)] p-8 shadow-[0_24px_42px_rgba(12,21,43,0.08)] max-[680px]:p-[1.4rem]"
      aria-labelledby="hero-title"
    >
      <p className="m-0 text-[0.82rem] font-bold uppercase tracking-[0.08em] text-(--accent)">Featured Work</p>

      {masonary ? <div className={"columns-1 gap-4 sm:columns-2 lg:columns-3 "}>{children}</div> : <div className={`columns-1 gap-4 lg:columns-4"}`}>{children}</div>}
    </section>
  );
};
export default HeroFeatured;

interface HeroFeaturedProps {
  children?: React.ReactNode;
  masonary?: boolean;
}
