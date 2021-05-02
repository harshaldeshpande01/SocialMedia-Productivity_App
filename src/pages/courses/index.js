import React, { useState, useEffect } from "react";
import "./style.css";
import { Course } from "../../containers/index";
import {Redirect, useHistory, Link} from 'react-router-dom';
import {Button, Spinner, Form, FormControl} from "react-bootstrap";
import { auth, db } from "../../firebase";
import { logout } from "../../services/auth";

export default function Courses() {

  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
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
      setCourses(snapshot.docs.map((doc) => ({ id: doc.id, course: doc.data() })));
      setLoading(false);
    });
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
    <center  style={{backgroundColor: '#f3f2ef', padding: '1em'}}>
      <Form inline className="search-form">
        <FormControl style={{width: '50%', marginLeft: '6%', marginRight: '1%'}} type="text" placeholder="Search courses (by name)" 
          value={search}
          onChange = {(e) => setSearch(e.target.value)}/>
        <Button style={{width: '18%', marginRight: '1%'}} variant="light" onClick = {() => setFilter(search)}>Search</Button>
        <Button style={{width: '18%'}} variant="light" onClick = {() => {setFilter(''); setSearch('')}}>Reset</Button>
      </Form>
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
            { course.course_name.toLowerCase().includes(filter.toLowerCase()) ?             
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
              :
              <></>
            }
            </>
          );
        })}
      </div>
    }
    </>
  );
}
