import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'

export default class Home extends PureComponent {
  render() {
    return (
      <div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
      </div>
    );
  }
}
