import { MarkdownContent } from "@/components/MarkdownContent";
import { P5Canvas } from "@/components/P5Canvas";
import { getMarkdownContent, getProject } from "@/data/projects";
import { simulationSketches } from "@/simulations";
import { Link, useParams } from "react-router-dom";

export function ProjectPage() {
  const { category, projectSlug } = useParams();

  if (!category || !projectSlug) {
    return (
      <section className="section-header">
        <h1>Project not found</h1>
        <p>This route is missing project details.</p>
      </section>
    );
  }

  const project = getProject(category, projectSlug);

  if (!project) {
    return (
      <section className="section-header">
        <h1>Project not found</h1>
        <p>We could not find this project.</p>
      </section>
    );
  }

  const markdown = getMarkdownContent(project.contentPath);
  const simulationSketch = simulationSketches[project.slug];

  return (
    <section className="content-stack" aria-labelledby="project-title">
      <div className="project-topline">
        <Link to={`/${project.category}`} className="inline-link">
          Back to {project.category.replace("-", " ")}
        </Link>
        <h1 id="project-title">{project.title}</h1>
        <p>{project.summary}</p>
      </div>

      {project.category === "system-simulations" && simulationSketch ? (
        <section className="simulation-stage" aria-label="Interactive p5 simulation">
          <P5Canvas sketch={simulationSketch} className="simulation-canvas-wrap" />
        </section>
      ) : null}

      {markdown ? <MarkdownContent markdown={markdown} /> : <p>Markdown content is missing for this project.</p>}
    </section>
  );
}
