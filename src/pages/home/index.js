import React, {useContext} from "react";
import "./style.css";
import {Feed, Feedback, Courses, Deadlines} from "../../containers/index";
import { UserContext } from "../../contexts/user";
import { Redirect } from "react-router-dom";
import {Navbar, Nav, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from "../../services/auth";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Home() {

  const [user, setUser] = useContext(UserContext).user;
  
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

          <Tabs>
          <TabList style={{border: 0, color: 'white'}}>
            <Tab>Feed</Tab>
            <Tab>Courses</Tab>
            <Tab>Deadlines</Tab>
            <Tab>Feedback</Tab>
          </TabList>

          <TabPanel>
            <Feed/>
          </TabPanel>
          <TabPanel>
            <Courses/>
          </TabPanel>
          <TabPanel>
            <Deadlines/>
          </TabPanel>
          <TabPanel>
            <Feedback/>
          </TabPanel>
        </Tabs>
    </div>
  );
}

