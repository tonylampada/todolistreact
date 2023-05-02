import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";

const storage = firebase.storage()

function ImageDisplay() {
  const [imageUrl, setImageUrl] = useState("");

  async function loadImage() {
    const ref = storage.ref("doces/pudim.jpg");
    const url = await ref.getDownloadURL();
    setImageUrl(url);
  }

  return (
    <div>
      <button onClick={loadImage}>Click to load Image and behold the world-famous picture of pudim.com.br</button>
      <br />
      <img src={imageUrl} alt="A delicious pudding."/>
    </div>
  );
}

export default ImageDisplay;
