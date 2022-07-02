import './HomeScreen.css'
import { LoginForm } from './LoginForm'
import { Redirect } from 'react-router-dom';
import { Nav } from "../common/Nav";
import { GoSignIn } from 'react-icons/go';

export function HomeScreen() {

  if(localStorage.getItem('token')) {
    return (<Redirect to="/boxes"/>)
  }

  return (
    <div className="homescreen">
       <Nav header={"vocab"}/>
       <LoginForm />
    </div>
  )
}
