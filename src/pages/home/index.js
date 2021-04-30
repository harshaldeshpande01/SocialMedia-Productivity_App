import React, {useState, useEffect, useContext} from "react";
import "./style.css";
import {Feed, Feedback, Courses, Deadlines} from "../../containers/index";
import { Redirect, useHistory } from "react-router-dom";
import {Navbar, Nav, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from "../../firebase";
import { logout } from "../../services/auth";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
          <Navbar bg="primary" variant="dark" expand="lg">
          <Navbar.Brand>SocioProd</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="mr-auto"></Nav>
              {/* <Button variant="primary" >Profile</Button>
              <Button variant="primary" >Deadlines</Button>
              <Button variant="primary" >Courses</Button> */}
              <Button variant="primary" onClick={clearUser}>Logout</Button>
            </Navbar.Collapse> 
          </Navbar>

        { !loading && 
          <Tabs>
          <TabList style={{border: 0, color: 'white'}}>
            <Tab>Feed</Tab>
            <Tab>Courses</Tab>
            <Tab>Deadlines</Tab>
            <Tab>Feedback</Tab>
          </TabList>

          <TabPanel>
            <Feed currentUser={currentUser}/>
          </TabPanel>
          <TabPanel>
            <Courses currentUser={currentUser}/>
          </TabPanel>
          <TabPanel>
            <Deadlines/>
          </TabPanel>
          <TabPanel>
            <Feedback/>
          </TabPanel>
        </Tabs>
        }
    </div>
  );
}

