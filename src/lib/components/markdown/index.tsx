import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { MarkdownCode, MarkdownHeading, MarkdownImage, MarkdownLink, MarkdownList, MarkdownListItem, MarkdownParagraph, MarkdownPre } from "./components";

const markdownComponents: Components = {
  h1: ({ node: _node, ...props }) => <MarkdownHeading level={1} {...props} />,
  h2: ({ node: _node, ...props }) => <MarkdownHeading level={2} {...props} />,
  h3: ({ node: _node, ...props }) => <MarkdownHeading level={3} {...props} />,
  a: ({ node: _node, ...props }) => <MarkdownLink {...props} />,
  p: ({ node: _node, ...props }) => <MarkdownParagraph {...props} />,
  ul: ({ node: _node, ...props }) => <MarkdownList ordered={false} {...props} />,
  ol: ({ node: _node, ...props }) => <MarkdownList ordered {...props} />,
  li: ({ node: _node, ...props }) => <MarkdownListItem {...props} />,
  pre: ({ node: _node, ...props }) => <MarkdownPre {...props} />,
  code: ({ node: _node, ...props }) => <MarkdownCode {...props} />,
  img: ({ node: _node, ...props }) => <MarkdownImage {...props} />,
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

interface MarkdownContentProps {
  markdown: string;
}
