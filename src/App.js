import React, { Component, Fragment } from "react";
import { Route } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { get } from "lodash";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Items from './components/Items';
import Private from "./components/Private";
import PrivateRoute from "./hocs/PrivateRoute";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/items" component={Items} />
        <PrivateRoute
          path="/private"
          component={Private}
          authenticated={get(this, "props.user.email")}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(App));
