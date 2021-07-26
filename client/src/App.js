import logo from './logo.svg';
import './App.css';
import EntryPoint from "./pages/entryPoint/EntryPoint"
import configureStore from "./store/configureStore"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Provider} from "react-redux"

function App() {
  const store = configureStore()
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <EntryPoint/>

          </Route>
        </Switch>

      </Router>
    
    </Provider>
  );
}

export default App;
