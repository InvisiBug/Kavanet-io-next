import React from "react";
import { Layout, BackArrow } from "src/lib/components";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import axios from "axios";

const WIPpage = (props: any) => {
  const folder = "experiments";
  const name = "studioFree";

  console.log(props.data);

  const Sketch = dynamic(() => import(`src/content/${folder}/${name}`), { ssr: false });

  return (
    <>
      <Layout header={false} footer={false}>
        <BackArrow />
        <Sketch />
      </Layout>
    </>
  );
};

export default WIPpage;

// export const getServerSideProps = async () => {
//   try {
//     let dataa;
//     console.log("boop");
//     const { data } = await axios.get("https://businessgateway.puregym.com/api/bookings/v1/timetable/75/scheduled-class");

//     console.log(data);

//     return {
//       props: {
//         data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         experiments: [],
//       },
//     };
//   }
// };

const borders = false;

const Description = styled.div`
  border: ${borders ? "2px solid red" : "none"};
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: 5rem;

  min-width: 0px;
  max-width: 15rem;
  color: white;
  font-weight: 400;
  font-size: 0.9rem;
  font-size: 1rem;
  text-align: justify;
  padding: 1rem;
  border: 1px solid grey;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5%;
`;
