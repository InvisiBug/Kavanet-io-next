import React, { FC } from "react";
import { NotionRenderer } from "react-notion";

import { getNotionPosts } from "lib/api";

const NotionBlock: FC<any> = ({ post, blocks }) => {
  return (
    <div style={{ maxWidth: 768 }}>
      <h1>{post.title}</h1>
      <NotionRenderer blockMap={blocks} />
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  // Get all posts again
  const posts = await getNotionPosts();

  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === slug);

  const blocks = await fetch(`https://notion-api.splitbee.io/v1/page/${post.id}`).then((res) => res.json());

  return {
    props: {
      blocks,
      post,
    },
  };
}

export default NotionBlock;

export async function getStaticPaths() {
  const posts = await getNotionPosts();
  return {
    paths: posts.map((row) => `/${row.slug}`),
    fallback: true,
  };
}
