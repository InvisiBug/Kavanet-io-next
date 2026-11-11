import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const distDirectory = resolve("dist");
const indexPath = resolve(distDirectory, "index.html");
const indexHtml = await readFile(indexPath, "utf8");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const contentTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => {
  const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return entities[character];
});

const getRequestOrigin = (request) => {
  const forwardedProtocol = request.headers["x-forwarded-proto"]?.split(",")[0].trim();
  const protocol = forwardedProtocol === "https" || (!forwardedProtocol && request.socket.encrypted) ? "https" : "http";
  const forwardedHost = request.headers["x-forwarded-host"]?.split(",")[0].trim();
  const host = forwardedHost || request.headers.host || "localhost";
  return `${protocol}://${host}`;
};

const getPreviewImageUrl = async (token, requestOrigin) => {
  if (!token || !/^[A-Za-z0-9_-]+$/.test(token)) {
    return null;
  }

  try {
    const decodedUrl = new URL(Buffer.from(token, "base64url").toString("utf8"));

    if (!(["http:", "https:"].includes(decodedUrl.protocol) && !decodedUrl.username && !decodedUrl.password && imageExtensions.has(extname(decodedUrl.pathname).toLowerCase()))) {
      return null;
    }

    if (decodedUrl.origin === requestOrigin) {
      const imagePath = decodeURIComponent(decodedUrl.pathname);
      const imageFilePath = resolve(distDirectory, `.${imagePath}`);

      if (!imageFilePath.startsWith(`${distDirectory}${sep}`) || !(await stat(imageFilePath)).isFile()) {
        return null;
      }
    }

    return decodedUrl.href;
  } catch {
    return null;
  }
};

const createOpenGraphTags = (pageUrl, imageUrl) => {
  const title = imageUrl ? "Image preview | Kavanet.io" : "Kavanet.io";
  const description = imageUrl ? "A shared image from Kavanet.io" : "Projects, community builds, and simulations by Kavanet.io.";
  const tags = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta property="og:site_name" content="Kavanet.io" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
  ];

  if (imageUrl) {
    tags.push(
      `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
      `<meta property="og:image:alt" content="${escapeHtml(description)}" />`,
      `<meta property="og:image:type" content="${contentTypes[extname(new URL(imageUrl).pathname).toLowerCase()] ?? "image/jpeg"}" />`,
    );
  }

  return tags.join("\n    ");
};

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  const requestOrigin = getRequestOrigin(request);
  let requestUrl;

  try {
    requestUrl = new URL(request.url || "/", requestOrigin);
  } catch {
    response.writeHead(400).end();
    return;
  }

  let requestedPath;

  try {
    requestedPath = decodeURIComponent(requestUrl.pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }

  let filePath = resolve(distDirectory, `.${requestedPath}`);

  if (!filePath.startsWith(`${distDirectory}${sep}`)) {
    filePath = indexPath;
  }

  try {
    if (!(await stat(filePath)).isFile()) {
      filePath = indexPath;
    }
  } catch {
    filePath = indexPath;
  }

  let body;
  let contentType;

  if (filePath === indexPath) {
    const imageUrl = await getPreviewImageUrl(requestUrl.searchParams.get("lightbox"), requestOrigin);
    body = indexHtml.replace("<!--SERVER_OPEN_GRAPH-->", createOpenGraphTags(requestUrl.href, imageUrl));
    contentType = contentTypes[".html"];
  } else {
    body = await readFile(filePath);
    contentType = contentTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream";
  }

  response.writeHead(200, {
    "Cache-Control": filePath === indexPath ? "no-store" : "public, max-age=31536000, immutable",
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": contentType,
  });

  if (request.method === "HEAD") {
    response.end();
  } else {
    response.end(body);
  }
});

const port = Number(process.env.PORT || 80);
server.listen(port, "0.0.0.0", () => {
  console.log(`Kavanet.io server listening on port ${port}`);
});
