import React, { useState, useContext } from "react";
import "./style.css";
import { Comment } from "../../components";
import CommentInput from "../../components/comment-input";

import FormControlLabel from '@material-ui/core/FormControlLabel'; 
import Checkbox from '@material-ui/core/Checkbox'; 
import Favorite from '@material-ui/icons/Favorite'; 
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'; 

import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import Rating from '@material-ui/lab/Rating';


export default function Course({
  currentUser,
  course_name,
  id,
  course_type,
  semester,
  professor,
  comments,
  username,
  rating,
}) {

  
  const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
  });
  
  const [value, setValue] = React.useState(4);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

  return (
    <div className="course">
      <div className="course__header">
        <div className="course__headerLeft">
          <b><u><p>{course_name}</p></u></b>
        </div>
      </div>
      <Rating
        style={{float: 'right'}}
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <br></br>
      <div>
          <p style={{alignContent: 'center'}}><PersonIcon fontSize = 'large'/>  {professor}</p>
      </div>
      <div>
          <p>Semester : {semester}</p>
      </div>
      <div>
          <p>Course type : {course_type}</p>
      </div>
      <div>
      <FormControlLabel 
          control={<Checkbox icon={<FavoriteBorder />}  
                    checkedIcon={<Favorite />} 
            name="checkedH" />} 
          label=""
        />
        {comments?
          <p style={{color: "blue", marginLeft: "2%"}}>Reviews</p>
          :
          <></>
        }
      </div>

      {comments ? (
        comments.map((comment) => (
          <Comment username={comment.username} caption={comment.comment} first={comment.username == username} />
        ))
      ) : (
        <></>
      )}

      {currentUser ? <CommentInput currentUser={currentUser} comments={comments} id={id} parent="courses"  /> : <></>}
    </div>
  );
}
