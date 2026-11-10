const ExperienceDetails = ({ details }: { details: string }) => {
  if (!details.includes("*")) {
    return <p className="m-0 whitespace-pre-line text-(--text-muted)">{details}</p>;
  }

  const blocks: Array<{ type: "text" | "bullets"; content: string[] }> = [];

  for (const rawLine of details.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    if (line.startsWith("*")) {
      const bullets = line
        .split("*")
        .map((bullet) => bullet.trim())
        .filter(Boolean);
      const previousBlock = blocks[blocks.length - 1];

      if (previousBlock?.type === "bullets") {
        previousBlock.content.push(...bullets);
      } else {
        blocks.push({ type: "bullets", content: bullets });
      }
    } else {
      blocks.push({ type: "text", content: [line] });
    }
  }

  return (
    <div className="text-(--text-muted)">
      {blocks.map((block, blockIndex) =>
        block.type === "text" ? (
          <p key={`text-${blockIndex}`} className="mt-0 mb-2 whitespace-pre-line">
            {block.content[0]}
          </p>
        ) : (
          <ul key={`bullets-${blockIndex}`} className="mt-2 mb-2 grid gap-1 list-disc pl-5">
            {block.content.map((bullet, bulletIndex) => (
              <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
};

export default ExperienceDetails;
