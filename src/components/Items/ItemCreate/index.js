import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ItemForm from '../ItemForm';
import { createItem } from '../../../store/item/actions';

class ItemCreate extends PureComponent {
  saveItem = (values) => Promise.resolve().then(() => ({
    data: {
      item: {
        id: new Date().getTime(),
        ...values,
      }
    }
  }));

  handleSavedItem = (item) => {
    this.props.createItem(item);
    this.props.push('/items')
  }

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

const mapDispatchToProps = {
  createItem,
  push,
}

export default connect(undefined, mapDispatchToProps)(ItemCreate);
