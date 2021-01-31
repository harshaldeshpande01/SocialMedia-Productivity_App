import React, { useState, useContext } from "react";
import "./style.css";
import { SignInBtn } from "../../components";
import { UserContext } from "../../contexts/user";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  const [user, setUser] = useContext(UserContext).user;

  const clearUser = () => setUser(null);

  return (
    <div className="navbar">
      <span style={{fontSize: "20px"}}>SocioProd</span>

      {user ? (
        <div>
          <Button variant="primary" onClick={clearUser}>Logout</Button>
        </div>
      ) : (
        <SignInBtn />
      )}

    </div>
  );
}
