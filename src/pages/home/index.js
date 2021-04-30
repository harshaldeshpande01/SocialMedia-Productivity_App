import React, {useState, useEffect} from "react";
import "./style.css";
import {Feed} from "../../containers/index";
import { Redirect, useHistory, Link } from "react-router-dom";
import {Button} from "react-bootstrap";
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
    <>
    <center>
      <div style={{display: 'flex', padding: '1em', width: '100%', backgroundColor: '#f3f2ef', alignItems: 'flex-end', justifyContent: 'center'}}>
        <h2 style={{color: 'black', fontSize: '2rem', fontWeight: '700'}}>SocioProd</h2>
      </div>
      <div style={{display: 'flex', width: '100%', height: '50px', backgroundColor: '#f3f2ef', alignItems: 'flex-start', justifyContent: 'center'}}>
          <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/courses' style={{textDecoration: 'none'}}>Courses</Link></Button>
          <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/deadlines' style={{textDecoration: 'none'}}>Deadlines</Link></Button>
          <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/contact' style={{textDecoration: 'none'}}>Contact</Link></Button>
          <Button variant='light' onClick={clearUser} style={{color: '#c30f42', backgroundColor: '#f3f2ef', border: 'none'}}>Logout</Button>
      </div>
    </center>

      <div className="home">

          { !loading && 
          <>
            <Feed currentUser = {currentUser }/>  
          </>
          }

      </div>
    </>
  );
}

