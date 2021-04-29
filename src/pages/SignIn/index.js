import React, {useState, useContext, useEffect} from "react";
import "./style.css";
import { UserContext } from "../../contexts/user";
import {auth} from '../../firebase';
import { signInWithFacebook, signInWithGoogle } from "../../services/auth";
import {Link, useHistory} from 'react-router-dom';
import google_img from './google-logo.png';
import fb_img from './fb-logo.png';
import {Alert} from 'react-bootstrap';

export default function SignIn() {

	const [user, setUser] = useContext(UserContext).user;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();

    const handleLogin = async () => {

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

        let newUser;
        await auth.signInWithEmailAndPassword(email, password)
        .then((res) => {
			setError("");
            newUser = res.user;
            setUser(newUser);
			history.push('/home');
        })
        .catch((err) => {
			setError('Invalid user credentials');
			return;
        });
    };

	const goolgeSignIn = async () => {
		let userBySignIn = await signInWithGoogle();
		if (userBySignIn) {
			setUser(userBySignIn);
			history.push('/home');
		}
	};

	const fbSignIn = async () => {
		let userBySignIn = await signInWithFacebook();
		if (userBySignIn) {
			setUser(userBySignIn);
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
				<input className="btn-submit" type="submit" value="Login" onClick={handleLogin}/>
			</div>

			<div className="separator-wrapper">
				<div className="separator">
					<span>OR</span>
				</div>
			</div>

			<div className="field-group">
				<button className="link-social-login" onClick={fbSignIn}>
					<img src={fb_img}/>
					Login with Facebook (beta)
				</button>
				<button className="link-social-login" onClick={goolgeSignIn}>
					<img src={google_img} />
					Login with Google
				</button>
			</div>

		</div>
	</div>
    </div>
    );
}