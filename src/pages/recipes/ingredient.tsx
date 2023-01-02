import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { Ingredients } from "src/lib/recipes/helpers";

const Ingredient: FC<Props> = ({ ingredient }) => {
  const [strikethrough, setStrikethrough] = useState(false);

  return (
    <Container strikethrough={strikethrough}>
      <Name>{ingredient?.name}</Name>
      <Quantity>{ingredient?.quantity}</Quantity>
      <Unit>{ingredient?.unit}</Unit>
      <Button
        type={"checkbox"}
        onClick={() => {
          setStrikethrough(!strikethrough);
        }}
      />
    </Container>
  );
};

export default Ingredient;

interface Props {
  ingredient: Ingredients;
}

const borders = false;

const Container = styled.div`
  display: flex;
  color: ${({ strikethrough }: { strikethrough: boolean }) => (strikethrough ? "grey" : "white")};
  text-decoration: ${({ strikethrough }: { strikethrough: boolean }) => (strikethrough ? "line-through" : "none")};
  width: 100%;
`;

const Button = styled.input`
  width: 1rem;
  height: 1rem;
  background-color: orange;
  margin-right: 1rem;
`;

const Name = styled.div`
  flex: 3;
  border: ${borders ? "2px solid green" : "none"};
`;

const Quantity = styled.div`
  /* margin-right: 1rem; */
  flex: 1;
  border: ${borders ? "2px solid white" : "none"};
`;

const Unit = styled.div`
  flex: 1;
  border: ${borders ? "2px solid orange" : "none"};
`;
