import React, { FC } from "react";
import { Layout, BackArrow } from "src/lib/components";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import axios from "axios";
import { Gym } from "../../content/studioFree/types";

const StudioFree: FC<Props> = ({ data }) => {
  const Sketch = dynamic(() => import(`src/content/studioFree`), { ssr: false }); // Have to import from not the pages folder

  return (
    <>
      <Layout header={false} footer={false}>
        <BackArrow />
        <Sketch data={data} />
      </Layout>
    </>
  );
};

type Props = {
  data: Gym;
};

export default StudioFree;

export const getServerSideProps = async () => {
  try {
    const { data } = await axios.get<Gym>("https://businessgateway.puregym.com/api/bookings/v1/timetable/75/scheduled-class");

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
};

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
