import Image from "./image";
import H1 from "./h1";
import H2 from "./h2";
import MyParagraph from "./paragraph";
export { default as Header } from "./header";

// https://samuelkraft.com/blog/building-a-notion-blog-with-public-api
export const renderBlock = (block: any) => {
  const { type } = block;
  // console.log(block);

  switch (type) {
    case "heading_1":
      const h1 = block[type].rich_text[0]?.text.content;
      return <H1>{h1}</H1>;

    case "heading_2":
      const h2 = block[type].rich_text[0]?.text.content;
      return <H2>{h2}</H2>;

    case "paragraph": // convert in to its own component
      return <MyParagraph>{block[type]?.rich_text}</MyParagraph>;

    case "image":
      // console.log(block);
      return <Image data={block} />;

    case "column_list":
      // console.log(block[type].children[0].column);
      // return <Image data={block} />;
      return <h1>Col</h1>;
  }
};
