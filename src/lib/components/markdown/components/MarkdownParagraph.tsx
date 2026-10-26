import { Children, cloneElement, isValidElement, type ComponentPropsWithoutRef, type ReactElement } from "react";

export const MarkdownParagraph = ({ children, ...props }: ComponentPropsWithoutRef<"p">) => {
  const paragraphChildren = Children.toArray(children);
  const images = paragraphChildren.filter(isImageElement);

  const onlyImages = paragraphChildren.every((child) => {
    if (isImageElement(child)) {
      return true;
    }

    return typeof child === "string" && child.trim().length === 0;
  });

  if (onlyImages && images.length > 1) {
    return (
      // <div className="mt-4 mb-1 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div className="mt-4 mb-1 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-5">
        {images.map((image, index) =>
          cloneElement(image, {
            key: image.key ?? `markdown-grid-image-${index}`,
            className: "block w-75 rounded-xl border border-(--line) bg-[#f8f9fd] object-cover",
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
};

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
