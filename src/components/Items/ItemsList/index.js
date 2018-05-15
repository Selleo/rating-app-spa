import React, { PureComponent } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getItems } from '../../../store/item/selectors';
import Item from '../Item'

export class ItemsList extends PureComponent {
  renderItemsList = () => {
    const { items } = this.props;

    return items.map((item) => (
      <Item key={item.id} item={item} />
    ));
  }

  render() {
    const { items } = this.props;

    return (
      <div>
        <h1>Your presentations/workshops list</h1>

        <Link to="/items/new">
          Add presentation/workshop
        </Link>

        {isEmpty(items) ? (
          <h2>There are no items</h2>
        ) : (
          this.renderItemsList()
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: getItems(state)
})

export default connect(mapStateToProps)(ItemsList);
