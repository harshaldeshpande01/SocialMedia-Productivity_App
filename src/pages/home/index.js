import React, {useContext, useState} from "react";
import "./style.css";
import { CreatePost } from "../../containers";
import Feed from "../../containers/feed";
import { UserContext } from "../../contexts/user";
import { Redirect } from "react-router-dom";
import {Navbar, Nav, NavDropdown, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { computeHeadingLevel } from "@testing-library/react";
import { logout } from "../../services/auth";

export default function Home() {
  const [user, setUser] = useContext(UserContext).user;
  // setUser(localStorage.getItem("user"));
  // window.reload(false);
  
  const clearUser = async () => {
    let loggedOut = await logout();
    if(loggedOut)
      setUser(null);
  }

  var redirect = user ? false : true;
  if (redirect) {
      return <Redirect to="/" />
  }

  return (
    <div className="home">
          <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/home">SocioProd</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Pages" id="basic-nav-dropdown">
                <NavDropdown.Item href="/courses">Courses</NavDropdown.Item>
                {/* <NavDropdown.Item href="Profile">Profile</NavDropdown.Item> */}
                <NavDropdown.Item href="/deadlines">Deadlines</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Something</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div>
              <Button variant="primary" onClick={clearUser}>Logout</Button>
            </div>
          </Navbar.Collapse>
          </Navbar>
          <CreatePost />
          <Feed />
    </div>
  );
}

