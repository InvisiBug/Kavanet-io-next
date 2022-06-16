// @ts-nocheck
// https://dev.to/chandrapantachhetri/responsive-react-file-upload-component-with-drag-and-drop-4ef8
import React, { useState } from "react";
import FileUpload from "./components/file-upload/file-upload.component";

function App() {
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });

  const updateUploadedFiles = (files) => setNewUserInfo({ ...newUserInfo, profileImages: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to create new user...
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FileUpload accept=".jpg,.png,.jpeg" label="Profile Image(s)" multiple updateFilesCb={updateUploadedFiles} />
        <button type="submit">Create New User</button>
      </form>
    </div>
  );
}

export default App;
