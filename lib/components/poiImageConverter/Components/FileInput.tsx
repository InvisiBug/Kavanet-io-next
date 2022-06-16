// https://dev.to/chandrapantachhetri/responsive-react-file-upload-component-with-drag-and-drop-4ef8
import React, { FC, useRef } from "react";
import styled from "@emotion/styled";

const Input: FC<any> = ({ setFilesCallback }) => {
  const fileInputField = useRef(null);

  return (
    <>
      <FormInput type="file" id="fileInput" ref={fileInputField}></FormInput>
    </>
  );
};

export default Input;

const FormInput = styled.input`
  width: 100%;
`;
