import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Flashcards from "./components/Flashcards";
// import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Flashcards}/>
      </Switch>
    </Router>
  );
}
export default App;
