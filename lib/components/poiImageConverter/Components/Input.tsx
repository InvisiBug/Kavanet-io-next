// https://dev.to/chandrapantachhetri/responsive-react-file-upload-component-with-drag-and-drop-4ef8
import React, { FC, useState, useRef, FormEvent, useEffect } from "react";
import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";

const Input: FC<any> = () => {
  const [files, setFiles] = useState<any>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: any) => {
      if (!acceptedFiles) return;
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file: any) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    if (files) {
      return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  };

  const setFilesCallback = (e: any) => {
    const { files: newFiles } = e.target;
    // setFiles(newFiles);
  };

  // useEffect(() => {
  //   if (files) {
  //     console.log(files.target);
  //   }
  //   const blob = new Blob([files], { type: "image/png" });
  //   const img = URL.createObjectURL(blob);
  //   console.log(blob);
  //   setSrc(img);

  //   // if (typeof window !== "undefined") {
  //   //   // console.log(window.URL.createObjectURL(files));
  //   // }
  // }, [files]);

  console.log(thumbs);
  return (
    <>
      <InputContainer>
        <Title>Image Input</Title>
        <Form onSubmit={handleSubmit}>
          {/* <FormInput type="file" id="fileInput" ref={fileInputField} onChange={setFilesCallback}></FormInput> */}
          <Go />
          {/* <img src={src} /> */}
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <div>{thumbs}</div>
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
