import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import "./components/css/newCss/all.min.css"
import "./components/css/newCss/global.css"
import "./components/css/newCss/style-2.css"
import "./components/css/newCss/style.css"

import LogIn from './components/LogIn'
import List from './components/List';

import AddTask from "./components/AddTask"
import AddTeam from "./components/AddTeam"
import MyTeam from "./components/MyTeam"
import SignUp from "./components/SignUp"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/my-list" component={List} />
        <Route exact path="/my-team" component={MyTeam} />
        <Route exact path="/add-team" component={AddTeam} />
        <Route exact path="/add-task" component={AddTask} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </Router>
    );
}

export default App;
