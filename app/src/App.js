import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BoxesManager } from "./components/BoxesManager";
import Flashcards from "./components/Flashcards";
import { BoxManager } from "./components/BoxManager";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BoxesManager}/>
        <Route exact path="/boxes" component={BoxesManager}/>
        <Route exact path="/boxes/:id" component={Flashcards}/>
        <Route exact path="/boxes/:id/manage" component={BoxManager}/>
      </Switch>
    </Router>
  );
}
export default App;
