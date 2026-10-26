export const getMarkdownContent = (path: string): string | null => {
  const markdown = markdownModules[path];

  if (!markdown) {
    return null;
  }

  return resolveRelativeMarkdownImages(ignoreMarkdownComments(markdown), path);
};

const ignoreMarkdownComments = (markdown: string): string => markdown.replace(/<!--[\s\S]*?-->/g, "");

const markdownModules = import.meta.glob("/src/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const markdownImageModules = import.meta.glob("/src/content/**/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  import: "default",
  eager: true,
}) as Record<string, string>;

const markdownVideoModules = import.meta.glob("/src/content/**/*.{mp4,webm,mov}", {
  import: "default",
  eager: true,
}) as Record<string, string>;

const resolveRelativeMarkdownImages = (markdown: string, markdownPath: string): string => {
  const markdownDirectory = markdownPath.slice(0, markdownPath.lastIndexOf("/") + 1);

  const resolveMediaPath = (match: string, rawImagePath: string) => {
    const imagePath = rawImagePath.trim().replace(/^<|>$/g, "");
    const normalizedImagePath = imagePath.startsWith("./") || imagePath.startsWith("../") ? imagePath : `./${imagePath}`;
    const resolvedPath = normalizeContentPath(`${markdownDirectory}${normalizedImagePath}`);
    const resolvedMediaSource = markdownImageModules[resolvedPath] ?? markdownVideoModules[resolvedPath];

    if (!resolvedMediaSource) {
      return match;
    }

    return match.replace(rawImagePath, resolvedMediaSource);
  };

  const markdownResolved = markdown.replace(/!\[[^\]]*\]\(([^)]+)\)/g, (match, rawImagePath: string) => resolveMediaPath(match, rawImagePath));

  return markdownResolved.replace(/(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi, (match, before: string, rawImagePath: string, after: string) => `${before}${resolveMediaPath(rawImagePath, rawImagePath).replace(/^\"|\"$/g, "")}${after}`);
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
