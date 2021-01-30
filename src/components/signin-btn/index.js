import React, { useContext } from "react";
import "./style.css";
import { signInWithGoogle } from "../../services/auth";
import { UserContext } from "../../contexts/user";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignInBtn() {
  const [, setUser] = useContext(UserContext).user;

  const signInBtnClick = async () => {
    let userBySignIn = await signInWithGoogle();
    if (userBySignIn) setUser(userBySignIn);
  };

  return (
    <Button variant="primary" onClick={signInBtnClick}>Sign in</Button>
  );
}
