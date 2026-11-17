import HeroRotatorControls from "@/lib/components/banners/heroRotator/HeroRotatorControls";
import HeroRotatorSlide from "@/lib/components/banners/heroRotator/HeroRotatorSlide";
import { useHeroRotator } from "@/lib/components/banners/heroRotator/useHeroRotator";

const HeroRotator = () => {
  const {
    activeIndex,
    handleClickCapture,
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleTransitionEnd,
    isDragging,
    isRepositioning,
    projects,
    selectProject,
    slides,
    trackTransform,
    viewportRef,
    goToNext,
    goToPrevious,
  } = useHeroRotator();

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-[1.2rem] border border-(--line) bg-(--surface) shadow-[0_18px_36px_rgba(12,21,43,0.08)]" aria-label="Rotating project highlights">
      <div ref={viewportRef} className="relative touch-pan-y overflow-hidden" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerCancel} onClickCapture={handleClickCapture}>
        <div className={`flex w-full ${isDragging || isRepositioning ? "" : "transition-transform duration-300 ease-out"}`} style={{ transform: trackTransform }} onTransitionEnd={handleTransitionEnd}>
          {slides.map(({ project, index, isClone, key }) => (
            <HeroRotatorSlide key={key} project={project} isActive={index === activeIndex} isClone={isClone} />
          ))}
        </div>
      </div>

      {projects.length > 1 ? <HeroRotatorControls projects={projects} activeIndex={activeIndex} onSelect={selectProject} onPrevious={goToPrevious} onNext={goToNext} /> : null}
    </section>
  );
};

export default HeroRotator;
