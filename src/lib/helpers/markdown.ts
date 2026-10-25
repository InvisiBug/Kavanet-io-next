export const getMarkdownContent = (path: string): string | null => {
  return markdownModules[path] ?? null;
};

const markdownModules = import.meta.glob("/src/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
