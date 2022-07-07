export type test = any;

export type CardFields = {
  title: string;
  subTitle: string;
  thumbnail?: string;
  tags?: string;
  slug: string;
  status?: string;
};

export type PageMetaData = {
  title?: string;
  slug?: string;
  subTitle?: string;
  thumbnail?: string;
  tags?: string[];
  status?: string;
  description?: string;
  coverImage?: string;
};

export type NotionResponse = any;
