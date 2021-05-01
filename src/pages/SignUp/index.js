import React, {useState} from "react";
import "./style.css";
import {auth} from '../../firebase';
import {Link} from 'react-router-dom';
import {Alert, Spinner} from 'react-bootstrap';

export default function SignIn() {

  	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
  	const [confirm, setConfirm] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
  	const [message, setMessage] = useState("");

    const handleRegister = async (event) => {
		event.preventDefault();

		if(email.length < 1) 
			return setError('Please provide an email');
		if (typeof email !== "undefined") {
			var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if (!pattern.test(email)) {
			  return setError("Email badly formatted");
			}
		}
		if(password.length < 1) 
			return setError('Please provide a password');
    	if(confirm.length < 1) 
			return setError('Please confirm your password');

    	if(password !== confirm)
      		return setError('Password\'s do not match')

		setLoading(true);

    	auth.createUserWithEmailAndPassword(email, password)
    	.then((res) => {
			setError("");
			setLoading(false);
      		setMessage("Succesful! Login to continue");
        })
      	.catch((err) => {
			setLoading(false);
			return setError('Email already in use');
      	});
    };

    return (
      <div>

	    <div className="content-body">
		    <div className="form-wrapper">
			    <h1 className="text-title">SocioProd </h1>
			    <div className="text-register"><Link to="/">&larr; Go back to Login</Link></div>

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

			<form onSubmit={handleRegister}>
			    <div className="field-group">
				  	<input
						onClick = {() => setError("")}
						value = {email}
						onChange = {(e) => setEmail(e.target.value)}
						className = "input" type="text" id="txt-email" name="email" placeholder = "E-mail"
					/>
				  	<input 
						onClick = {() => setError("")}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="input" type="password" id="txt-password" name="password" placeholder="Password"
					/>
          			<input 
						onClick = {() => setError("")}
						value={confirm}
						onChange={(e) => setConfirm(e.target.value)}
						className="input" type="password" id="cfm-password" name="password" placeholder="Confirm password"
					/>
			    </div>
			<div className="field-group">
				{loading?
					<Spinner animation="border" variant="danger" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
					:
					<input className="btn-submit" type="submit" value="SignUp" disabled={loading}/>
				}
			</div>
		</form>

		</div>
	</div>
    </div>
    );
}