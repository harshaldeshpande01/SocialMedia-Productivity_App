import React, {useState, useEffect} from 'react';
import emailjs from 'emailjs-com';
import './style.css'
import { Link, Redirect, useHistory } from "react-router-dom";
import { Button, Alert,Spinner } from "react-bootstrap";
import { auth } from "../../firebase";
import { logout } from "../../services/auth";

export default function Feedback() {

  const [currentUser, setCurrentUser] = useState();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [btnloading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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

  function sendEmail(e) {
    e.preventDefault();

    if(name.length < 1) 
			return setError('Please provide your name');
    if(email.length < 1) 
			return setError('Please provide an email');
		if (typeof email !== "undefined") {
			var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if (!pattern.test(email)) {
			  return setError("Email badly formatted");
			}
		}
    if(text.length < 1) 
			return setError('Please provide your message');

    setBtnLoading(true);

    emailjs.sendForm('service_ogw531r', 'template_0qiu2pk', e.target, 'user_1bco7e9uWjUeiPL1pqIja')
      .then((result) => {
        setMessage('Thank you for your feedback!!');
        setBtnLoading(false);
        return;
      }, (error) => {
        setBtnLoading(false);
        return setError('Something went wrong!');
      });
  }

  return (
    <>
    {!loading &&
      <>
      <center>
            <div style={{display: 'flex', padding: '1em', width: '100%', backgroundColor: '#f3f2ef', alignItems: 'flex-end', justifyContent: 'center'}}>
                <h2 style={{color: 'black', fontSize: '2rem', fontWeight: '700'}}>SocioProd</h2>
            </div>
            <div style={{display: 'flex', width: '100%', height: '50px', backgroundColor: '#f3f2ef', alignItems: 'flex-start', justifyContent: 'center'}}>
                <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/home' style={{textDecoration: 'none'}}>Home</Link></Button>
                <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/courses' style={{textDecoration: 'none'}}>Courses</Link></Button>
                <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/deadlines' style={{textDecoration: 'none'}}>Deadlines</Link></Button>
                <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><u><Link to='/contact' style={{textDecoration: 'none'}}>Contact</Link></u></Button> 
                <Button variant='light' onClick={clearUser} style={{color: '#c30f42', backgroundColor: '#f3f2ef', border: 'none'}}>Logout</Button>
            </div>
      </center>

    <div className="content-body">
		<div className="form-wrapper">
        {
					error && 
					<Alert variant="danger">
						{error}
					</Alert>
				}
        		{
					message && 
					<Alert variant="success">
						{message}
					</Alert>
				}
        <form onSubmit={sendEmail}>
              <div className="field-group">
                <input
                onClick = {() => setError("")}
                value = {name}
                onChange = {(e) => setName(e.target.value)}
                className = "input" type="text" name="user_name" placeholder = "Name"
              />
                <input
                onClick = {() => setError("")}
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                className = "input" type="text" name="user_email" placeholder = "E-mail"
              />
              <textarea 
                onClick = {() => setError("")}
                value={text}
                rows='5'
                onChange={(e) => setText(e.target.value)}
                className="input" name="message" placeholder="Message"
              />
              </div>

          {btnloading?
            <Spinner animation="border" variant="danger" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            :
            <div className="field-group">
              <input className="btn-submit" type="submit" value="Submit"/>
            </div>
          }
        </form>
    </div>
    </div>
    </>
    }
    </>
  );
}

