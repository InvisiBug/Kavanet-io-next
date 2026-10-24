import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  markdown: string;
}

const markdownComponents: Components = {
  h1: ({ node: _node, ...props }) => <h1 className="mt-4 mb-2 text-3xl font-bold first:mt-0" {...props} />,
  h2: ({ node: _node, ...props }) => <h2 className="mt-4 mb-2 text-2xl font-semibold first:mt-0" {...props} />,
  h3: ({ node: _node, ...props }) => <h3 className="mt-4 mb-2 text-xl font-semibold first:mt-0" {...props} />,
  p: ({ node: _node, ...props }) => <p className="mt-3 mb-0 text-(--text-muted) first:mt-0" {...props} />,
  ul: ({ node: _node, ...props }) => <ul className="mt-3 mb-0 list-disc pl-5" {...props} />,
  ol: ({ node: _node, ...props }) => <ol className="mt-3 mb-0 list-decimal pl-5" {...props} />,
  li: ({ node: _node, ...props }) => <li className="text-(--text-muted)" {...props} />,
  pre: ({ node: _node, ...props }) => <pre className="mt-3 mb-0 overflow-x-auto rounded-xl border border-(--line) bg-[#f8f9fd] p-3" {...props} />,
  code: ({ node: _node, className, ...props }) => <code className={className ? `${className} rounded-md bg-[#eef1f8] px-1.5 py-0.5` : "rounded-md bg-[#eef1f8] px-1.5 py-0.5"} {...props} />,
  img: ({ node: _node, ...props }) => <img {...props} className="mx-auto mt-3 mb-4 block w-full max-w-160 rounded-xl border border-(--line) bg-[#f8f9fd]" />,
};

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  return (
    <article className="rounded-2xl border border-(--line) bg-(--surface) p-5">
      <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
