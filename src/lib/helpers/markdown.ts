export const getMarkdownContent = (path: string): string | null => {
  const markdown = markdownModules[path];

  if (!markdown) {
    return null;
  }

  return resolveRelativeMarkdownImages(markdown, path);
};

const markdownModules = import.meta.glob("/src/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const markdownImageModules = import.meta.glob("/src/content/**/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  import: "default",
  eager: true,
}) as Record<string, string>;

const resolveRelativeMarkdownImages = (markdown: string, markdownPath: string): string => {
  const markdownDirectory = markdownPath.slice(0, markdownPath.lastIndexOf("/") + 1);

  return markdown.replace(/!\[[^\]]*\]\(([^)]+)\)/g, (match, rawImagePath: string) => {
    const imagePath = rawImagePath.trim().replace(/^<|>$/g, "");

    if (!imagePath.startsWith("./") && !imagePath.startsWith("../")) {
      return match;
    }

    const resolvedPath = normalizeContentPath(`${markdownDirectory}${imagePath}`);
    const resolvedImageSource = markdownImageModules[resolvedPath];

    if (!resolvedImageSource) {
      return match;
    }

    return match.replace(rawImagePath, resolvedImageSource);
  });
};

const normalizeContentPath = (path: string): string => {
  const segments = path.split("/");
  const resolvedSegments: string[] = [];

  for (const segment of segments) {
    if (!segment || segment === ".") {
      continue;
    }

    if (segment === "..") {
      resolvedSegments.pop();
      continue;
    }

    resolvedSegments.push(segment);
  }

  return `/${resolvedSegments.join("/")}`;
};
