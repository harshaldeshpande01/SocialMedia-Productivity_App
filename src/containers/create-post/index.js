import React, { useState } from "react";
import "./style.css";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { storage, db } from "../../firebase";
import makeid from "../../helper/functions";

import firebase from "firebase";

export default function CreatePost( {currentUser} ) {

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

      var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

      var imagePreview = document.getElementById("image-preview");
      imagePreview.src = selectedImageSrc;
      imagePreview.style.display = "block";
    }
  };

  const handleUpload = () => {
    if (image) {
      var imageName = makeid(10);
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function 1%,2%...

          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          // get download url and upload the post info

          storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                photoUrl: imageUrl,
                username: currentUser.email.replace("@gmail.com", ""),
                profileUrl: currentUser.photoURL,
              });
            });

          setCaption("");
          setProgress(0);
          setImage(null);

          document.getElementById("image-preview").style.display = "none";
        }
      );
    }
  };

  return (
    <>

    <div className="createPost">
        <div className="createPost__loggedIn">
          <p>Create Post</p>
          <div className="createPost__loggedInCenter">
            <textarea
              className="createPost__textarea"
              rows="3"
              placeholder="enter caption here.."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>

            <div className="createPost__imagePreview">
              <img id="image-preview" alt="" />
            </div>
          </div>
          <div className="createPost__loggedInBottom">
            <div className="createPost__imageUpload">
              <label htmlFor="fileInput">
                <AddAPhotoIcon
                  style={{ cursor: "pointer", fontSize: "20px" }}
                />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <button
              className="createPost__uploadBtn"
              onClick={handleUpload}
              style={{ color: caption ? "#000" : "lightgrey" }}
            >
              {`Upload ${progress !== 0 ? progress : ""}`}
            </button>
          </div>
        </div>
    </div>
    
    </> 
  );
}
