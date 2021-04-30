import React, {useState, useEffect} from "react";
import "./style.css";
import {Feed} from "../../containers/index";
import { Redirect, useHistory, Link } from "react-router-dom";
import {Navbar, Nav, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from "../../firebase";
import { logout } from "../../services/auth";

export default function Home() {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user) {
        setCurrentUser(user);
        setLoading(false);
      }
      else {
        history.push('/');
      } 
    })
    return unsubscribe;
  });
  
  const clearUser = async () => {
    let loggedOut = await logout();
    if(loggedOut)
      setCurrentUser(null);
    return <Redirect to="/" />
  }

  return (
    <div className="home">
          <Navbar bg="light" expand="lg">
          <Navbar.Brand>SocioProd</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="mr-auto"></Nav>
              <Button variant="light"><Link to='/home'>Home</Link></Button>
              <Button variant="light"><Link to='/courses'>Courses</Link></Button>
              <Button variant="light" style={{color: '#c30f42'}} onClick={clearUser}>Logout</Button>
            </Navbar.Collapse> 
          </Navbar>

        { !loading && <Feed currentUser = {currentUser }/> }

    </div>
  );
}

