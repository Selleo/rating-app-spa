import React, { PureComponent, Fragment } from 'react'
import { Route } from 'react-router-dom';
import AgendasList from './AgendasList'

class Agenda extends PureComponent {
  render() {
    return (
      <Fragment>
        <Route exact path="/agendas" component={AgendasList} />
        <Route exact path="/agendas/:id" render={() => 'Agenda view'} />
      </Fragment>
    );
  }
}

export default Agenda;
