import React, { useState, useEffect } from "react";
import "./style.css";
import { Course } from "../../containers/index";
import {Redirect, useHistory, Link} from 'react-router-dom';
import {Button, Spinner} from "react-bootstrap";
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
    
      <center>
        <div style={{display: 'flex', padding: '1em', width: '100%', backgroundColor: '#f3f2ef', alignItems: 'flex-end', justifyContent: 'center'}}>
          <h2 style={{color: 'black', fontSize: '2rem', fontWeight: '700'}}>SocioProd</h2>
        </div>
        <div style={{display: 'flex', width: '100%', height: '50px', backgroundColor: '#f3f2ef', alignItems: 'flex-start', justifyContent: 'center'}}>
            <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/home' style={{textDecoration: 'none'}}>Home</Link></Button>
            <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><u><Link to='/courses' style={{textDecoration: 'none'}}>Courses</Link></u></Button>
            <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/deadlines' style={{textDecoration: 'none'}}>Deadlines</Link></Button>
            <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/contact' style={{textDecoration: 'none'}}>Contact</Link></Button> 
            <Button variant='light' onClick={clearUser} style={{color: '#c30f42', backgroundColor: '#f3f2ef', border: 'none'}}>Logout</Button> 
        </div>
      </center>

    {loading?
      <Spinner className='loading-animation' animation="border" variant="danger" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      :
      <div className="courses">
        {courses.map(({ id, course }) => {
          return (
            <>
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
            </>
          );
        })}
      </div>
    }
    </>
  );
}
