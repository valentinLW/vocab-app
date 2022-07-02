import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sigInSuccess, setSignInSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const headers = {'Content-Type': 'application/json'}
    const data = {username: username, password: password}
    axios
      .post("/api/v1/login", data, {headers: headers})
      .then((response) => {
        if(response.data.token) {
          localStorage.setItem('token', `bearer ${response.data.token}`);
          localStorage.setItem('name', `${response.data.name}`);
          setSignInSuccess(true);
        } else {
          console.log("nope", response.data.error);
        }
      })
      .catch((error) => console.log(error));
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  if(localStorage.getItem('token')) {
    return (<Redirect to="/boxes"/>)
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input value={username} onChange={handleUsernameChange} type="text" placeholder="username" />
      <input value={password} onChange={handlePasswordChange} type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  )
}
