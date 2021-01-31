import React, {useState, useContext, useEffect} from "react";
import "./style.css";
import { UserContext } from "../../contexts/user";
import { Redirect } from "react-router-dom";
import {Navbar, Form, Button} from "react-bootstrap";
import {SignInBtn} from "../../components/index"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default function Login() {

    const [user, setUser] = useContext(UserContext).user;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    var redirect = user ? true : false;
    if (redirect) {
        return <Redirect to="/home" />
    }

    return (
        <div className="login">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">SocioProd</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                </Navbar.Collapse>
            </Navbar>
            <div className="Login">
                    <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>
                <Button variant="primary" block size="lg" type="submit" disabled={!validateForm()}>
                Login
                </Button>
                <SignInBtn />
            </Form>
            </div>
        </div>
    );
}