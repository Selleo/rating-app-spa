import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom';
import ItemsList from './ItemsList';
import ItemCreate from './ItemCreate';

export default class Items extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/items" component={ItemsList} />
        <Route path="/items/new" component={ItemCreate} />
        <Route path="/items/:id" render={() => 'View Item'} />
        <Route path="/items/:id/edit" render={() => 'Edit item'} />
      </Switch>
    )
  }
}
