// @ts-ignore
import React, { useEffect, useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Layout } from "lib/components";
import App from "experiments/reactWrapper";

const P5js: React.FC = () => {
  const Sketch = dynamic(() => import("experiments/smartRockets"), { ssr: false });
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
      <Layout header={false} footer={false}>
        {/* <div></div> */}
        {/* <P5Dots /> */}
        <Sketch />
        {/* <App /> */}
      </Layout>
      {/* {element} */}
      {/* <DynamicComponentWithNoSSR /> */}
    </>
  );
};

export default P5js;
