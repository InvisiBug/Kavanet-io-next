import React, {FC} from "react";
import styled from "@emotion/styled"

type Props = {
  children: React.ReactElement;
  width: string;
}

const ItemContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

 export const Item: FC<Props> = ({children, width}) => {
  return <ItemContainer style={{width: width}}>
    {children}
  </ItemContainer>
 }