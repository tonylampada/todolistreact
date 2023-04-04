import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";

const storage = firebase.storage()

function StoragePoc() {
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const handleFileNameChange = (event: any) => {
    setFileName(event.target.value);
  };

  const handleFileContentChange = (event: any) => {
    setFileContent(event.target.value);
  };

  const handleUpload = () => {

    const fileRef = storage.ref().child(fileName);
    fileRef.putString(fileContent).then(() => {
      console.log("File uploaded successfully!");
    });
  };

  return (
    <div>
      <label htmlFor="fileName">type a file name to save to firebase storage:</label>
      <input
        type="text"
        id="fileName"
        value={fileName}
        onChange={handleFileNameChange}
      />
      <br />
      <label htmlFor="fileContent">File content:</label>
      <textarea
        id="fileContent"
        value={fileContent}
        onChange={handleFileContentChange}
      ></textarea>
      <br />
      <button onClick={handleUpload}>Upload file</button>
    </div>
  );
}

export default StoragePoc;
