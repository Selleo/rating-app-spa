import React, { Component, Fragment } from "react";
import { Route } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Private from "./components/Private";
import _ from "lodash";
import "./App.css";
import PrivateRoute from "./hocs/PrivateRoute";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <PrivateRoute
          path="/private"
          component={Private}
          authenticated={_.get(this, "props.user.email")}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(App));
