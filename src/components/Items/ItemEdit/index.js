import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getItem } from '../../../store/item/selectors'
import { updateItem } from '../../../store/item/actions'
import ItemForm from '../ItemForm';

export class ItemEdit extends PureComponent {
  componentDidMount() {
    /**
     * TODO: Fetch event
     */
  }

  saveItem = (values) => Promise.resolve().then(() => ({
    data: {
      item: values,
    }
  }));

  onItemSaved = (item) => {
    this.props.updateItem(item)
    this.props.push('/items');
  }

  render() {
    const { item } = this.props;

    if (!item) {
      return (
        <h1>Item not found</h1>
      )
    }

    return (
      <div>
        <h1>
          Edit item{' '}
          <em>{item.topic}</em>
        </h1>

        <ItemForm
          initialValues={item}
          saveItem={this.saveItem}
          onItemSaved={this.onItemSaved}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  item: getItem(state, props.match.params.id)
})

const mapDispatchToProps = {
  updateItem,
  push,
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEdit);
