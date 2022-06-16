// https://dev.to/chandrapantachhetri/responsive-react-file-upload-component-with-drag-and-drop-4ef8
import React, { FC, useState, useRef, FormEvent } from "react";
import styled from "@emotion/styled";

const Input: FC = () => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState<any>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  };

  const setFilesCallback = (files: any) => {
    setFiles(files);
  };

  return (
    <>
      <InputContainer>
        <Title>Image Input</Title>
        <Form onSubmit={handleSubmit}>
          <FormInput
            type="file"
            id="fileInput"
            ref={fileInputField}
            onChange={(e) => {
              console.log(e);
            }}
          ></FormInput>
          <Go />
        </Form>
      </InputContainer>
    </>
  );
};

export default Input;

const InputContainer = styled.div`
  height: 45%;
  width: 45%;
  background-color: darkgreen;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  border: 1px solid red;
`;

const Form = styled.form`
  width: 90%;
  height: 50%;
  border: 1px solid red;
`;

const FormInput = styled.input`
  width: 100%;
`;

const Go = styled.button`
  border: 1px solid orange;
  height: 40px;
  width: 40px;
`;
