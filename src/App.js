import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BoxList } from "./components/BoxList/BoxList";
import { Box } from "./components/Box/Box";
import { BoxManager } from "./components/BoxManager/BoxManager";
import { HomeScreen } from "./components/common/HomeScreen";
import { SignOut } from "./components/common/SignOut";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { Mastery } from "./components/Mastery/Mastery";
import { MasteryManager } from "./components/Mastery/MasteryManager";
import { NewBox } from "./components/NewBox/NewBox";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen}/>
        <Route exact path="/signout" component={SignOut}/>
        <ProtectedRoute exact path="/boxes" component={BoxList}/>
        <ProtectedRoute exact path="/boxes/:id" component={Box}/>
        <ProtectedRoute exact path="/boxes/:id/manage" component={BoxManager}/>
        <ProtectedRoute exact path="/mastery" component={Mastery}/>
        <ProtectedRoute exact path="/mastery/manage" component={MasteryManager}/>
        <ProtectedRoute exact path="/new" component={NewBox}/>
      </Switch>
    </Router>
  );
}
export default App;
