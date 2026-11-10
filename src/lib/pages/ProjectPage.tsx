import { Link, useParams } from "react-router-dom";
import { MarkdownContent, P5Canvas, simLoader, ErrorPage } from "@/lib/components";

import { getMarkdownContent, getProject } from "@/lib/helpers";

const ProjectPage = () => {
  const { category, projectSlug } = useParams();
  const project = getProject(category, projectSlug);

  if (!category || !projectSlug || !project) {
    return <ErrorPage />;
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

      {/* set height to 125 when taking a pic, normally 200 */}
      {project.category === "simulations" && simulationSketch ? (
        <section className="rounded-2xl border border-(--line) bg-(--surface)  h-125 lg:h-200" aria-label="Interactive p5 simulation">
          <P5Canvas sketch={simulationSketch} className="w-full" />
        </section>
      ) : null}

      {markdown ? <MarkdownContent markdown={markdown} /> : null}
    </section>
  );
};

export default ProjectPage;
