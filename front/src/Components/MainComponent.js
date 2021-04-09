import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Polls from "./AllPolls";
import CreatePoll from "./CreatePollComponent";
import Header from './HeaderComponent'
import Login from "./LoginComponent";
import Register from "./RegisterComponent";
import Poll from "./SinglePoll";



class Main extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Polls} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/createpoll" component={CreatePoll} />
          <Route exact path="/poll/:pollId" component={Poll} />
        </Switch>
      </div>
    );
  }
}
export default Main;
