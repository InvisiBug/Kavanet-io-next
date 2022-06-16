// @ts-ignore
import React, { useEffect, useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Layout } from "lib/components";

const P5js: React.FC = () => {
  const Sketch = dynamic(() => import("experiments/batsim"), { ssr: false });

  return (
    <>
      <Layout header={false} footer={false}>
        <Sketch />
      </Layout>
    </>
  );
};

export default P5js;
