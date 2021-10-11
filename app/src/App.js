import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BoxesManager } from "./components/BoxesManager";
import { BoxManager } from "./components/BoxManager";
import Flashcards from "./components/Flashcards";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Flashcards}/>
        <Route exact path="/boxes" component={BoxesManager}/>
        <Route exact path="/boxes/:id" component={BoxManager}/>
      </Switch>
    </Router>
  );
}
export default App;
