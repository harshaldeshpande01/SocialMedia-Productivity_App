import React from 'react';
import emailjs from 'emailjs-com';
import './style.css'
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";

export default function Feedback() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_ogw531r', 'template_0qiu2pk', e.target, 'user_1bco7e9uWjUeiPL1pqIja')
      .then((result) => {
          console.log(result.text);
          alert(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <>
      <center>
      <div style={{display: 'flex', padding: '1em', width: '100%', backgroundColor: '#f3f2ef', alignItems: 'flex-end', justifyContent: 'center'}}>
        <h2 style={{color: 'black', fontSize: '2rem', fontWeight: '700'}}>SocioProd</h2>
      </div>
      <div style={{display: 'flex', width: '100%', height: '50px', backgroundColor: '#f3f2ef', alignItems: 'flex-start', justifyContent: 'center'}}>
          <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/home' style={{textDecoration: 'none'}}>Home</Link></Button>
          <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/courses' style={{textDecoration: 'none'}}>Courses</Link></Button>
          <Button variant='light' style={{backgroundColor: '#f3f2ef', border: 'none'}} ><Link to='/deadlines' style={{textDecoration: 'none'}}>Deadlines</Link></Button>
      </div>
    </center>

    <form className="form-container" onSubmit={sendEmail}>
      <label style={{textAlign: 'center', fontSize: '25px'}}>Get in Touch!</label>
      <label className="label" >Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" className="submitButton" value="Send" />
    </form>
    </>
  );
}

