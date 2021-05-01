import React, {useState} from "react";
import "./style.css";
import {auth} from '../../firebase';
import {Link} from 'react-router-dom';
import {Alert, Spinner} from 'react-bootstrap';

export default function SignIn() {

  	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

  	const handleReset = async (event) => {

		event.preventDefault();
		if(email.length < 1) 
		  return setError('Please provide an email');
		if (typeof email !== "undefined") {
			var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if (!pattern.test(email)) {
			  return setError("Email badly formatted");
			}
		}

		setLoading(true);
        
		await auth.sendPasswordResetEmail(email)
        .then((res) => {
			setError("");
			setLoading(false);
			setMessage("Mail sent! Please check your inbox");
        })
        .catch((err) => {
			setLoading(false);
			return setError('No account linked to this email');
        });
    };

    return (
        <div>

	    <div className="content-body">
		    <div className="form-wrapper">
			    <h1 className="text-title">SocioProd </h1>

				<div className = "go-back">
					<Link to='/'>
						&larr; Back to Login
				    </Link>
				</div>

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

			<form onSubmit={handleReset}>
			    <div className="field-group">
				    <input
						onClick = {() => setError("")}
						value = {email}
						onChange = {(e) => setEmail(e.target.value)}
						className = "input" type="text" id="txt-email" name="email" placeholder = "E-mail"
					/>
			    </div>

				<div className="field-group">
					{loading?
						<Spinner animation="border" variant="danger" role="status">
							<span className="sr-only">Loading...</span>
						</Spinner>
						:
						<input className="btn-submit" type="submit" value="Reset" disabled={loading}/>
					}
				</div>
			</form>

			<div className="separator-wrapper">
				<div className="separator">
					<span>OR</span>
				</div>
			</div>

			<div className="text-register">Don't have an account yet? <Link to="/Signup"> Register here</Link></div>

		</div>
	</div>
    </div>
    );
}