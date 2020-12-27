import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import LandingPage from "./LandingPage";
import UserPage from "./UserPage";
import Scores from "./Scores";
import SignUp from "./SignUp";
import create from "./Create";
import login from "./login";
import trivia from "./trivia";

//import FilterableProductTable from './thinkinginreact'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/LandingPage" component={LandingPage} />
      <Route path="/UserPage" component={UserPage} />
      <Route path="/Scores" component={Scores} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/Create" component={create} />
      <Route path="/login" component={login} />
      <Route path="/trivia" component={trivia} />
    </Switch>
  </main>
);

export default Main;
