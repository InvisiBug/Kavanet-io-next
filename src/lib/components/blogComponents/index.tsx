import Image from "./image";
import H1 from "./h1";
import H2 from "./h2";
import MyParagraph from "./paragraph";
export { default as Header } from "./header";

// https://samuelkraft.com/blog/building-a-notion-blog-with-public-api
export const renderBlock = (block: any) => {
  const { type } = block;

  switch (type) {
    case "heading_1":
      return <H1>{block[type].rich_text[0]?.text.content}</H1>;

    case "heading_2":
      return <H2>{block[type].rich_text[0]?.text.content}</H2>;

    case "paragraph": // convert in to its own component
      return <MyParagraph>{block[type]?.rich_text}</MyParagraph>;

    case "image":
      // console.log(block);
      return <Image src={block[type]?.file?.url} />;
  }
};
