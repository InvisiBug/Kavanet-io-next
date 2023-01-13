import React, { FC } from "react";
import { Layout, Showcase, Card } from "src/lib/components";
import styled from "@emotion/styled";
import { recipes } from "../../lib/recipes/recipes";
import { sum, generateUniqueIngredientArray } from "../../lib/recipes/helpers";
import { Ingredients } from "../../lib/recipes/helpers";
import Ingredient from "./ingredient";
import { mq, px } from "src/lib/mediaQueries";

const Recipes: FC<Props> = ({ data }) => {
  return (
    <>
      <Layout footer={false}>
        {data.map((ingredient: Ingredients) => {
          return (
            <Row key={ingredient.name}>
              <Ingredient ingredient={ingredient} />
            </Row>
          );
        })}
      </Layout>
    </>
  );
};

export default Recipes;

interface Props {
  data: Array<Ingredients>;
}

export const getServerSideProps = async () => {
  const data = generateUniqueIngredientArray(recipes).map((ingredient) => {
    return { name: ingredient.name, quantity: sum(ingredient.name, recipes), unit: ingredient.unit };
  });

  data.sort((a, b) => a.name.localeCompare(b.name));

  return {
    props: {
      data,
    },
  };
};

const borders = false;

const Row = styled.div`
  min-width: 95vw;
  margin-bottom: 1rem;
  ${mq("medium")} {
    min-width: 50vw;
  }
  ${mq("medium")} {
    min-width: 25vw;
  }
`;
