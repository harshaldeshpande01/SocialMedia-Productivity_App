import React from 'react';
import emailjs from 'emailjs-com';
import './style.css'

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
    <form id="container" onSubmit={sendEmail}>
      <label style={{textAlign: 'center', fontSize: '25px'}}>Get in Touch!</label>
      {/* <h1>Get in touch!</h1> */}
      <label className="label" >Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" className="submitButton" value="Send" />
    </form>
  );
}

