import React, { PureComponent } from 'react'
import ItemForm from '../ItemForm';

export default class ItemCreate extends PureComponent {
  saveItem = () => Promise.resolve().then(() => ({
    data: 'hello world'
  }));

  handleSavedItem = () => console.log('Saved!')

  render() {
    return (
      <div>
        <h1>Add new workshop/presentation</h1>

        <ItemForm
          saveItem={this.saveItem}
          onItemSaved={this.handleSavedItem}
        />
      </div>
    );
  }
}
