import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  markdown: string;
}

const markdownComponents: Components = {
  img: ({ node: _node, ...props }) => (
    <img
      {...props}
      style={{
        display: "block",
        width: "100%",
        maxWidth: "640px",
        margin: "0.8rem auto 1rem",
        border: "1px solid var(--line)",
        borderRadius: "0.8rem",
        background: "#f8f9fd",
      }}
    />
  ),
};

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  return (
    <article className="markdown-body">
      <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
