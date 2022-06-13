// @ts-ignore
import React, { useEffect, useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Layout } from "lib/components";

const Sketch = dynamic(() => import("experiments/p5Dots"), { ssr: false });

const P5js: React.FC = () => {
  let element = <h1>hello</h1>;
  // useLayoutEffect(() => {
  //   element = <P5Dots />;
  // });
  // return element;

  // useLayoutEffect(() => {

  //     console.log(window);
  //     element = <P5Dots />;

  // });

  return (
    <>
      <Layout>
        {/* <div></div> */}
        {/* <P5Dots /> */}
        <Sketch />
      </Layout>
      {/* {element} */}
      {/* <DynamicComponentWithNoSSR /> */}
    </>
  );
};

export default P5js;
