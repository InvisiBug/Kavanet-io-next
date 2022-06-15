import React, { FC } from "react";
import dynamic from "next/dynamic";
import { Layout } from "lib/components";

const Experiments: FC<any> = ({ slug }) => {
  console.log("🚀 ~ file: [slug].tsx ~ line 5 ~ slug", slug);

  const Sketch = dynamic(() => import(`experiments/${slug}`), { ssr: false });
  // const Sketch = dynamic(() => import(`experiments/p5Dots`), { ssr: false });

  return (
    <>
      <Layout footer={false}>
        <Sketch />
      </Layout>
    </>
  );
};

export const getServerSideProps = async ({ params }: args) => {
  return {
    props: {
      slug: params.slug,
    },
  };
};

export default Experiments;

interface args {
  params: {
    slug: string;
  };
}
