import React, { useState, useEffect } from "react";
import "./style.css";
import { Course } from "../../containers/index";
import {Redirect, useHistory, Link} from 'react-router-dom';
import {Navbar, Nav, Button} from "react-bootstrap";
import { auth, db } from "../../firebase";
import { logout } from "../../services/auth";

export default function Courses() {

  const [courses, setCourses] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const clearUser = async () => {
    let loggedOut = await logout();
    if(loggedOut)
      setCurrentUser(null);
    return <Redirect to="/" />
  }

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

  useEffect(() => {
    db.collection("courses").onSnapshot((snapshot) => {
      // snapshot.docs.orderBy("semester");
      setCourses(snapshot.docs.map((doc) => ({ id: doc.id, course: doc.data() })));
    });
    // setCourses(courses.sort((a, b) => {return a.semester - b.semester}))
    // console.log(courses)
  }, []);

  return (
    <>
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
    <div className="courses">
      {courses.map(({ id, course }) => {
        return (
          <>
            {!loading &&
              <Course
              currentUser = {currentUser}
              key={id}
              id={id}
              course_name={course.course_name}
              course_type={course.course_type}
              semester={course.semester}
              professor={course.professor}
              comments={course.comments}
              username={course.username}
              rating={course.rating}
            />
            }
          </>
        );
      })}
    </div>
    </>
  );
}
