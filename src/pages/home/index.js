import React, {useContext} from "react";
import "./style.css";
import { Navbar, CreatePost } from "../../containers";
import Feed from "../../containers/feed";
import { UserContext } from "../../contexts/user";

export default function Home() {

  return (
    <div className="home">
        <>
          <Navbar />
          <CreatePost />
          <Feed />
        </>
    </div>
  );
}

