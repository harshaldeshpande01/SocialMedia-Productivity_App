import React, { useState, useContext } from "react";
import "./style.css";
import { Comment } from "../../components";
import { storage, db } from "../../firebase";
import CommentInput from "../../components/comment-input";

import FormControlLabel from '@material-ui/core/FormControlLabel'; 
import Checkbox from '@material-ui/core/Checkbox'; 
import Favorite from '@material-ui/icons/Favorite'; 
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'; 

export default function Post({
  currentUser,
  profileUrl,
  username,
  id,
  photoURl,
  caption,
  comments,
}) {

  let sameUser;
  if(currentUser)
    sameUser = currentUser.email.includes(username);
  else
    sameUser = false;

  const deletePost = () => {
    if(sameUser) {
    // delete the image from firebase storage

    // get ref to the image file we like to delete
    var imageRef = storage.refFromURL(photoURl);

    // delete the file
    imageRef
      .delete()
      .then(function () {
        console.log("delete successfull");
      })
      .catch(function (error) {
        console.log(`Error ${error}`);
      });

    //2 delete the post info from firebase firestore
    db.collection("posts")
      .doc(id)
      .delete()
      .then(function () {
        console.log("delete post info successfull");
      })
      .catch(function (error) {
        console.log(`Error post info delete ${error}`);
      });
    }
  };
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerLeft">
          <img className="post__profilePic" src={profileUrl} />
          <u><p style={{ marginLeft: "8px", marginTop: "8px"}}>{username}</p></u>
        </div>
        {sameUser ?
          <button onClick={deletePost} className="post__delete">
            Delete
          </button>
          :
          <></>
        }
      </div>

      <div className="post__center">
        <img className="post__photoUrl" src={photoURl} />
      </div>

      <div>
        <FormControlLabel 
          control={<Checkbox icon={<FavoriteBorder />}  
                    checkedIcon={<Favorite />} 
            name="checkedH" />} 
          label=""
        />
        <FormControlLabel 
          control={<Checkbox icon={<EmojiEmotionsIcon />}  
                    checkedIcon={<InsertEmoticonIcon />} 
            name="checkedH" />} 
          label=""
        />
        <p> 
          <span style={{ fontWeight: "500", marginRight: "4px" }}>
          <u>{username}</u>
          </span>
          - {caption}
        </p>
        {comments?
          <p style={{color: "blue", marginLeft: "2%"}}>Comments</p>
          :
          <></>
        }
      </div>

      {comments ? (
        comments.map((comment) => (
          <Comment key={comment.comment} username={comment.username} caption={comment.comment} first={comment.username == username} />
        ))
      ) : (
        <></>
      )}

      {currentUser ? <CommentInput currentUser={currentUser} comments={comments} id={id} parent="posts"/> : <></>}
    </div>
  );
}
