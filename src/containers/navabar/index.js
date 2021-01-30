import React, { useState, useContext } from "react";
import "./style.css";
import { SignInBtn } from "../../components";
import { UserContext } from "../../contexts/user";

export default function Navbar() {
  const [user, setUser] = useContext(UserContext).user;

  const clearUser = () => setUser(null);

  return (
    <div className="navbar">
      <span style={{fontSize: "20px"}}>SocioProd</span>

      {user ? (
        <div>
          <button className="button button1" onClick={clearUser}>Logout</button>
        </div>
      ) : (
        <SignInBtn />
      )}

    </div>
  );
}
