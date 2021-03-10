import React, {useState, useContext, useEffect} from "react";
import "./style.css";
import { UserContext } from "../../contexts/user";
import { Redirect } from "react-router-dom";
import {SignInBtn} from "../../components/index"
import 'bootstrap/dist/css/bootstrap.min.css';
import {auth} from '../../firebase';
import {Link} from 'react-router-dom';

export default function Login() {

    const [user, setUser] = useContext(UserContext).user;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleLogin = () => {
        let newUser;
        auth.signInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res.user);
            newUser = res.user;
            setUser(newUser);
        })
        .catch((err) => {
            alert(err.message);
        });
    };

    var redirect = user ? true : false;
    if (redirect) {
        return <Redirect to="/home" />
    }

    return (
        <>
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <p style={{fontFamily: "monospace"}} className="heading brand-logo ">SocioProd</p>
          <p className="head">
            <Link style={{color: "white"}} to="/Signup"> Don't have an accout? Signup</Link>
          </p>
          <div>
            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="joinInput" type="text" 
            />
          </div>
          <div>
            <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="joinInput mt-20" type="password" 
            />
          </div>
            <button className={'button mt-20 pointer'} type="submit" onClick={handleLogin} disabled={!validateForm()}>Login</button>
            <SignInBtn />
        </div>
      </div>
      </>   
    );
}