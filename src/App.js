import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BoxList } from "./components/BoxList/BoxList";
import { Box } from "./components/Box/Box";
import { BoxManager } from "./components/BoxManager/BoxManager";
import { HomeScreen } from "./components/common/HomeScreen";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen}/>
        <Route exact path="/boxes" component={BoxList}/>
        <Route exact path="/boxes/:id" component={Box}/>
        <Route exact path="/boxes/:id/manage" component={BoxManager}/>
      </Switch>
    </Router>
  );
}
export default App;
