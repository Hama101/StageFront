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
import Chat from "./components/Chat"
import Nav from "./components/Nav"

function App() {
  return (
    <Router>
    <div className="row d-flex justify-content-center">
      <div style={{top:0 , width:"400px"}}>
        <Nav/>
      </div>
    
      <div className="centred">
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/my-list" component={List} />
        <Route exact path="/my-team" component={MyTeam} />
        <Route exact path="/add-team" component={AddTeam} />
        <Route exact path="/add-task" component={AddTask} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/chat-room" component={Chat} />
      </Switch>
      </div>
    
    </div></Router>
    );
}

export default App;
