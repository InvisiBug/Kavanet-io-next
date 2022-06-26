import Link from "next/link";
import { getNotionPosts } from "lib/api";

function HomePage({ posts }: { posts: any }) {
  return (
    <div>
      {posts.map((post: any) => (
        <Link href="/[slug]" key={post.slug} as={`/${post.slug}`}>
          <div>{post.title}</div>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;

export const getServerSideProps = async () => {
  const posts = await getNotionPosts();

  console.log("🚀 ~ file: index.tsx ~ line 29 ~ getServerSideProps ~ experiments", posts);

  return {
    props: {
      posts,
    },
  };
};
