import React, { Component, Fragment } from 'react';
import { Route } from 'react-router'
import Home from './components/Home'
import Login from "./components/Login";
import Registration from "./components/Registration";
import Items from './components/Items';
import "./App.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/items" component={Items} />
      </Fragment>
    );
  }
}

export default App;
