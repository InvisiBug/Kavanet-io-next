export type test = any;

export type PageMetaData = {
  title?: string;
  slug?: string;
  subTitle?: string;
  thumbnail?: string;
  tags?: string[];
  status?: "Live" | "Dev" | "Hidden";
  description?: string;
  coverImage?: string;
  cardType?: "small" | "large";
};

export type NotionResponse = any;
