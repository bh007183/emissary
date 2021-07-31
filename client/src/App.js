
import './App.css';
import EntryPoint from "./pages/entryPoint/EntryPoint"
import Login from "./pages/login"
import UserDash from "./pages/dashboard"
import configureStore from "./store/configureStore"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Provider} from "react-redux"

function App() {
  const store = configureStore()
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/createAccount">
            <EntryPoint/>
          </Route>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/userDashBoard">
            <UserDash/>
          </Route>
        </Switch>

      </Router>
    
    </Provider>
  );
}

export default App;
