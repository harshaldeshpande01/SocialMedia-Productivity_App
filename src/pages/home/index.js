import React, {useContext, useState} from "react";
import "./style.css";
import {Feed, Profile} from "../../containers/index";
import { UserContext } from "../../contexts/user";
import { Redirect } from "react-router-dom";
import {Navbar, Nav, NavDropdown, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from "../../services/auth";

export default function Home() {
  const [user, setUser] = useContext(UserContext).user;
  // const [selected, setSelected] = useState("Feed");

  // let Compo;
  // if(selected == "Feed") {
  //   Compo = Feed;
  //   console.log(Compo);
  // }
  // else if(selected == "Profile") {
  //   Compo = Profile; 
  //   console.log(Compo);
  // }
  
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
          <Navbar bg="primary" variant="dark" expand="lg">
          <Navbar.Brand href="/home">SocioProd</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
              <Button variant="primary" >Profile</Button>
              <Button variant="primary" >Deadlines</Button>
              <Button variant="primary" >Courses</Button>
              <Button variant="primary" onClick={clearUser}>Logout</Button>
          </Navbar.Collapse>
          </Navbar>
          {/* <Compo /> */}
          <Feed />
    </div>
  );
}

