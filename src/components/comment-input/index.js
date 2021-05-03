import React, { useState } from "react";
import "./style.css";
import { db } from "../../firebase";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

export default function CommentInput({ currentUser, comments, id, parent }) {
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState(comments ? comments : []);

  const addComment = () => {
    if (comment != "") {
      // add comment to the post info

      commentArray.push({
        comment: comment,
        username: currentUser.email.replace("@gmail.com", "").toLowerCase(),
      });

      const str = parent;
      db.collection(str)
        .doc(id)
        .update({
          comments: commentArray,
        })
        .then(function () {
          setComment("");
        })
        .catch(function (error) {
          console.log(`Error ${error}`);
        });
    }
  };

  return (
    <div className="commentInput">
      <textarea
        className="commentInput__textarea"
        rows="1"
        placeholder="write a comment.."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      {/* <button onClick={addComment} className="commentInput__btn">
        < SendIcon />
      </button> */}
      <IconButton aria-label="send" color="primary" onClick={addComment}>
        < SendIcon />
      </IconButton>
    </div>
  );
}
