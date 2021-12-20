import './HomeScreen.css'
import { LoginForm } from './LoginForm'


export function HomeScreen() {

  return (
    <div className="homescreen">
       <h1>Vocab - flashcards</h1>
       <LoginForm />
    </div>
  )
}
