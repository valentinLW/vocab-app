import './HomeScreen.css'
import { LoginForm } from './LoginForm'
import { Redirect } from 'react-router-dom';

export function HomeScreen() {

  if(localStorage.getItem('token')) {
    return (<Redirect to="/boxes"/>)
  }

  return (
    <div className="homescreen">
       <h1>Vocab - flashcards</h1>
       <LoginForm />
    </div>
  )
}
