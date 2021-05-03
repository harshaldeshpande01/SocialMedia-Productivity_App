import React, {useState} from "react";
import "./style.css";
import { Comment } from "../../components";
import { storage, db } from "../../firebase";
import CommentInput from "../../components/comment-input";
import {Link} from 'react-router-dom';

import FormControlLabel from '@material-ui/core/FormControlLabel'; 
import Checkbox from '@material-ui/core/Checkbox'; 
import Favorite from '@material-ui/icons/Favorite'; 
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/Delete';

import {ConfirmDialog} from '../../components/index';

export default function Post({
  currentUser,
  profileUrl,
  username,
  id,
  photoURl,
  caption,
  comments,
}) {

  const [confirmOpen, setConfirmOpen] = useState();

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

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
          <img className="post__profilePic" src={profileUrl} alt="Profile"/>
          <u><p style={{ marginLeft: "8px", marginTop: "8px"}}>{username}</p></u>
        </div>
        {sameUser ?
          <div>
            <IconButton aria-label="delete" color="disabled" onClick={() => setConfirmOpen(true)}>
              <DeleteOutlinedIcon />
            </IconButton>
            <ConfirmDialog
              title="Delete Post?"
              open={confirmOpen}
              setOpen={setConfirmOpen}
              onConfirm={deletePost}
            >
              Are you sure you want to delete this post?
            </ConfirmDialog>
          </div>
          // <button onClick={deletePost} className="post__delete">
          //   Delete
          // </button>
          :
          <></>
        }
      </div>

      <div className="post__center">
        <img 
          className="post__photoUrl" 
          src={photoURl} alt="post"
          onClick={() => openInNewTab(photoURl)}
        />
      </div>

      <div>
        <FormControlLabel 
          control={<Checkbox icon={<FavoriteBorder />}  
                    checkedIcon={<Favorite />} 
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
          <Comment key={comment.comment} username={comment.username} caption={comment.comment} first={comment.username === username} />
        ))
      ) : (
        <></>
      )}

      {currentUser ? <CommentInput currentUser={currentUser} comments={comments} id={id} parent="posts"/> : <></>}
    </div>
  );
}
