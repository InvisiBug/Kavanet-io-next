import { Children, cloneElement, isValidElement, type ReactElement } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const standaloneImageClass = "mx-auto mt-3 mb-4 block w-full max-w-160 rounded-xl border border-(--line) bg-[#f8f9fd]";
const gridImageClass = "block h-full w-full rounded-xl border border-(--line) bg-[#f8f9fd] object-cover";

function isImageElement(child: unknown): child is ReactElement<{ className?: string; src?: string }> {
  if (!isValidElement(child)) {
    return false;
  }

  if (child.type === "img") {
    return true;
  }

  if (typeof child.props !== "object" || child.props === null) {
    return false;
  }

  const elementProps = child.props as Record<string, unknown>;
  return typeof elementProps.src === "string";
}

const markdownComponents: Components = {
  h1: ({ node: _node, ...props }) => <h1 className="mt-4 mb-2 text-3xl font-bold first:mt-0" {...props} />,
  h2: ({ node: _node, ...props }) => <h2 className="mt-4 mb-2 text-2xl font-semibold first:mt-0" {...props} />,
  h3: ({ node: _node, ...props }) => <h3 className="mt-4 mb-2 text-xl font-semibold first:mt-0" {...props} />,
  p: ({ node: _node, children, ...props }) => {
    const paragraphChildren = Children.toArray(children);
    const images = paragraphChildren.filter(isImageElement);
    const onlyImages = paragraphChildren.every((child) => {
      if (isImageElement(child)) {
        return true;
      }

      if (typeof child === "string") {
        return child.trim().length === 0;
      }

      return false;
    });

    if (onlyImages && images.length > 1) {
      return (
        <div className="mt-4 mb-1 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) =>
            cloneElement(image, {
              key: image.key ?? `markdown-grid-image-${index}`,
              className: gridImageClass,
            }),
          )}
        </div>
      );
    }

    return (
      <p className="mt-3 mb-0 text-(--text-muted) first:mt-0" {...props}>
        {children}
      </p>
    );
  },
  ul: ({ node: _node, ...props }) => <ul className="mt-3 mb-0 list-disc pl-5" {...props} />,
  ol: ({ node: _node, ...props }) => <ol className="mt-3 mb-0 list-decimal pl-5" {...props} />,
  li: ({ node: _node, ...props }) => <li className="text-(--text-muted)" {...props} />,
  pre: ({ node: _node, ...props }) => <pre className="mt-3 mb-0 overflow-x-auto rounded-xl border border-(--line) bg-[#f8f9fd] p-3" {...props} />,
  code: ({ node: _node, className, ...props }) => <code className={className ? `${className} rounded-md bg-[#eef1f8] px-1.5 py-0.5` : "rounded-md bg-[#eef1f8] px-1.5 py-0.5"} {...props} />,
  img: ({ node: _node, className, ...props }) => <img {...props} className={className ?? standaloneImageClass} />,
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
