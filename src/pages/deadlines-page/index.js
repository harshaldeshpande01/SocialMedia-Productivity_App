import React, {useState, useEffect} from 'react';
import {Button, Spinner} from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';
// import { auth, db } from "../../firebase";
import {db, auth} from '../../firebase';
import { logout } from "../../services/auth";
import { TodoListItem } from "../../components/index";

export default function DeadlinesPage() {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      getTodos();
    }, []); // blank to run only on first launch

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

    function getTodos() {
      db.collection("todos").onSnapshot(function (querySnapshot) {
        setTodos(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            inprogress: doc.data().inprogress,
            lastdate: doc.data().lastdate,
          }))
        );
      });
    }
  
    const clearUser = async () => {
      let loggedOut = await logout();
      if(loggedOut)
        setCurrentUser(null);
      return <Redirect to="/" />
    }

    return (
        <div>
            <center>
            <div style={{display: 'flex', padding: '1em', width: '100%', backgroundColor: '#f3f2ef', alignItems: 'flex-end', justifyContent: 'center'}}>
                <h2 style={{color: 'black', fontSize: '2rem', fontWeight: '700'}}>SocioProd</h2>
            </div>
            <div style={{display: 'flex', width: '100%', height: '50px', backgroundColor: '#f3f2ef', alignItems: 'flex-start', justifyContent: 'center'}}>
                <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/home' style={{textDecoration: 'none'}}>Home</Link></Button>
                <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/courses' style={{textDecoration: 'none'}}>Courses</Link></Button>
                <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><u><Link to='/deadlines' style={{textDecoration: 'none'}}>Deadlines</Link></u></Button>
                <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/contact' style={{textDecoration: 'none'}}>Contact</Link></Button> 
                <Button variant='light' onClick={clearUser} style={{color: '#c30f42', backgroundColor: '#f3f2ef', border: 'none'}}>Logout</Button> 
            </div>
            </center>
            {loading?
                <Spinner className='loading-animation' animation="border" variant="danger" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                :
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: 'f3f2ef'
                  }}
                >
                  <div style={{ width: "90vw", maxWidth: "650px", marginTop: "24px" }}>
                      {todos.map((todo) => (
                        <TodoListItem
                          todo={todo.todo}
                          lastdate = {todo.lastdate}
                          inprogress={todo.inprogress}
                          id={todo.id}
                        />
                      ))}
                  </div>
                </div>
            }
        </div>
    );
}
