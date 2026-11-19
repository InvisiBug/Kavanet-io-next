import { type ProjectEntry } from "@/lib/types";
import type { FC } from "react";

const Meta: FC<Props> = ({ project }) => {
  return (
    <div className="px-4 pb-0 pt-3">
      <h3 className="m-0 text-(--text)">{project.title}</h3>
      <p className="mt-2 mb-2 text-[0.92rem] text-(--text-muted)">{project.summary}</p>
    </div>
  );
};

export default Meta;

type Props = {
  project: ProjectEntry;
};
