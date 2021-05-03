import React, {useState} from "react";
import "./style.css";
import {auth} from '../../firebase';
import { signInWithGithub, signInWithGoogle } from "../../services/auth";
import {Link, useHistory} from 'react-router-dom';
import google_img from './google-logo.png';
import fb_img from './fb-logo.png';
import {Alert, Spinner, useAccordionToggle} from 'react-bootstrap';


export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

    const handleLogin = async (event) => {

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

		setLoading(true);

        await auth.signInWithEmailAndPassword(email, password)
        .then((res) => {
			setError("");
			setLoading(false);
			history.push('/home');
        })
        .catch((err) => {
			setLoading(false);
			return setError('Invalid user credentials');
        });
    };

	const goolgeSignIn = async () => {
		let userBySignIn = await signInWithGoogle();
		if (userBySignIn) {
			history.push('/home');
		}
	};

	const gitSignIn = async () => {
		let userBySignIn = await signInWithGithub();
		if (userBySignIn) {
			console.log(userBySignIn);
			history.push('/home');
		}
	};

    return (
        <div>

	    <div className="content-body">
		    <div className="form-wrapper">
			    <h1 className="text-title">SocioProd </h1>
			    <div className="text-register">Don't have an account yet? <Link to="/Signup"> Register here</Link></div>

				{
					error && 
					<Alert variant="danger">
						{error}
					</Alert>
				}
			<form onSubmit={handleLogin}>
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
			    </div>

				<div className = "forgot-pass">
					{/* <label for="chk-rememberme">
					    <input className="checkbox" type="checkbox" id="chk-rememberme" name="rememberme" />
					    Remember me
				    </label> */}
					<Link to='/forgot-password'>
					    Forgot Password?
				    </Link>
				</div>

			<div className="field-group">
				{loading? 
					<Spinner animation="border" variant="danger" role="status">
  						<span className="sr-only">Loading...</span>
					</Spinner>
					:
					<input 
						className="btn-submit" type="submit" value="Login"
					/>
				}
			</div>
		</form>
			{/* <div className="separator-wrapper">
				<div className="separator">
					<span>OR</span>
				</div>
			</div> */}

			<div className="field-group">
				{/* <button className="link-social-login" onClick={gitSignIn}>
					<img src={fb_img} alt="fb-logo"/>
					SignIn with Github 
				</button> */}
				<button className="link-social-login" onClick={goolgeSignIn}>
					<img src={google_img} alt="google-logo"/>
					Sign-In with Google
				</button>
			</div>

		</div>
	</div>
    </div>
    );
}

