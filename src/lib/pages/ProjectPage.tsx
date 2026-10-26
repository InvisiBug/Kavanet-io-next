import { Link, useParams } from "react-router-dom";
import { MarkdownContent, P5Canvas, simLoader } from "@/lib/components";

import { getMarkdownContent, getProject } from "@/lib/helpers";

const ProjectPage = () => {
  const { category, projectSlug } = useParams();

  //! Project missing Error
  if (!category || !projectSlug) {
    return (
      <section className="grid gap-2 rounded-2xl border border-(--line) bg-(--surface) p-5">
        <h1>Project not found</h1>
        <p>This route is missing project details.</p>
      </section>
    );
  }

  const project = getProject(category, projectSlug);

  // Project not found
  if (!project) {
    return (
      <section className="grid gap-2 rounded-2xl border border-(--line) bg-(--surface) p-5">
        <h1>Project not found</h1>
        <p>We could not find this project.</p>
      </section>
    );
  }

  const markdown = project?.writeUpPath && getMarkdownContent(project?.writeUpPath);
  const simulationSketch = project.simulationKey ? simLoader[project.simulationKey] : null;

  return (
    <section className="grid gap-6" aria-labelledby="project-title">
      <div className="grid gap-2 rounded-2xl border border-(--line) bg-(--surface) p-5">
        <Link to={`/${project.category}`} className="font-bold text-(--text) no-underline transition hover:text-(--accent)">
          ← Back to {project.category.replace("-", " ")}
        </Link>
        <h1 className="mt-4 mb-2 text-3xl font-bold first:mt-0 " id="project-title">
          {project.title}
        </h1>
        <p className="text-(--text-muted)">{project.summary}</p>
      </div>

      {/* P5 canvas */}
      {project.category === "simulations" && simulationSketch ? (
        <section className="rounded-2xl border border-(--line) bg-(--surface) p-4 h-125 lg:h-200" aria-label="Interactive p5 simulation">
          <P5Canvas sketch={simulationSketch} className="w-full" />
        </section>
      ) : null}

      {markdown ? <MarkdownContent markdown={markdown} /> : null}
    </section>
  );
};

export default ProjectPage;
