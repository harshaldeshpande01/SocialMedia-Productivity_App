import React, { useState, useContext } from "react";
import "./style.css";
import { Comment } from "../../components";
import CommentInput from "../../components/comment-input";
import { UserContext } from "../../contexts/user";
import StarRatings from 'react-star-ratings';

export default function Course({
  course_name,
  id,
  course_type,
  semester,
  professor,
  comments,
  username,
  rating,
}) {
  const [user, setUser] = useContext(UserContext).user;
  console.log(username);
  return (
    <div className="course">
      <div className="course__header">
        <div className="course__headerLeft">
          <b><u><p>{course_name}</p></u></b>
        </div>
      </div>
      <div style={{float: 'right'}}> 
        <StarRatings
          rating={rating}
          starRatedColor="blue"
          numberOfStars={5}
          name='rating'
          starDimension="20px"
          starSpacing="5px"
        />
      </div>
      <div>
          <p><img src="https://img.icons8.com/ios-filled/30/000000/user-male-circle.png"/> : {professor}</p>
      </div>
      <div>
          <p>Semester : {semester}</p>
      </div>
      <div>
          <p>Course type : {course_type}</p>
      </div>
      <div>
        {comments?
          <p style={{color: "blue", marginLeft: "2%"}}>Comments</p>
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

      {user ? <CommentInput comments={comments} id={id} parent="courses"  /> : <></>}
    </div>
  );
}
