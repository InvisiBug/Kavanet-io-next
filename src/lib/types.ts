export type test = any;

export type ProjectType = {
  properties: PageMetaData;
};

export type PageMetaData = {
  title?: string;
  slug?: string;
  subTitle?: string;
  thumbnail?: string;
  categories?: string[];
  status?: "Live" | "Dev" | "Hidden";
  description?: string;
  coverImage?: string;
  cardType?: "small" | "large" | "clean";
  folder: "experiments" | "plots" | "projects";
  tags?: string[];
};

export type NotionResponse = any;
