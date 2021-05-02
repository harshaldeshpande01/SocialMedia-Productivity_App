import React, { useState, useEffect } from "react";
import "./style.css";
import { CreatePost} from "../index";
import { Post } from "..";
import { db } from "../../firebase";

export default function Feed( {currentUser} ) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
    
  }, []);

  return (
    <>
    <CreatePost currentUser = {currentUser}/>
    <div className="feed">
      {
        posts.map(({ id, post }) => {
        return (
          <Post
            currentUser={currentUser}
            key={id}
            id={id}
            profileUrl={post.profileUrl}
            username={post.username}
            photoURl={post.photoUrl}
            caption={post.caption}
            comments={post.comments}
          />
        );
      })}
    </div>
    </>
  );
}
