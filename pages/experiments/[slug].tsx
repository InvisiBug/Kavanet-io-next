import React, { FC } from "react";
import dynamic from "next/dynamic";
import { Layout } from "lib/components";

const Experiments: FC<any> = ({ slug }) => {
  const Sketch = dynamic(() => import(`experiments/${slug}`), { ssr: false });

  return (
    <>
      <Layout header={false} footer={false}>
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
