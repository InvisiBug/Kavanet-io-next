import { Link, useParams } from "react-router-dom";
import { MarkdownContent, P5Canvas } from "@/lib/components";
import { simulationSketches } from "@/content/simulations";
import { getMarkdownContent, getProject } from "@/lib/helpers";

const ProjectPage = () => {
  const { category, projectSlug } = useParams();

  if (!category || !projectSlug) {
    return (
      <section className="grid gap-2 rounded-2xl border border-(--line) bg-(--surface) p-5">
        <h1>Project not found</h1>
        <p>This route is missing project details.</p>
      </section>
    );
  }

  const project = getProject(category, projectSlug);

  if (!project) {
    return (
      <section className="grid gap-2 rounded-2xl border border-(--line) bg-(--surface) p-5">
        <h1>Project not found</h1>
        <p>We could not find this project.</p>
      </section>
    );
  }

  const markdown = getMarkdownContent(project.contentPath);
  const simulationSketch = project.simulationKey ? simulationSketches[project.simulationKey] : null;

  return (
    <section className="grid gap-6" aria-labelledby="project-title">
      <div className="grid gap-2 rounded-2xl border border-(--line) bg-(--surface) p-5">
        <Link to={`/${project.category}`} className="font-bold text-(--text) no-underline transition hover:text-(--accent)">
          Back to {project.category.replace("-", " ")}
        </Link>
        <h1 id="project-title">{project.title}</h1>
        <p className="text-(--text-muted)">{project.summary}</p>
      </div>

      {markdown ? <MarkdownContent markdown={markdown} /> : <p>Markdown content is missing for this project.</p>}

      {project.category === "system-simulations" && simulationSketch ? (
        <section className="rounded-2xl border border-(--line) bg-(--surface) p-4" aria-label="Interactive p5 simulation">
          <P5Canvas sketch={simulationSketch} className="w-full" />
        </section>
      ) : null}
    </section>
  );
};

export default ProjectPage;
