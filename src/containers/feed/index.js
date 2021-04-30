import React, { useState, useEffect } from "react";
import "./style.css";
import { CreatePost} from "../index";
import { Post } from "..";
import { db } from "../../firebase";

export default function Feed( {currentUser} ) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });

    // setPosts(posts.sort((a,b) => (a.post.timestamp.seconds > b.post.timestamp.seconds) ? 1 : 0));

    // posts.map((post) => {
    //   return console.log(post.post.timestamp)
    // });
    
  }, []);

  return (
    <>
    <CreatePost currentUser = {currentUser}/>
    <div className="feed">
      {posts.map(({ id, post }) => {
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
