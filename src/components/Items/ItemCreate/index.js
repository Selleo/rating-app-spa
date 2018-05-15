import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ItemForm from "../ItemForm";
import { createItem } from "../../../store/item/actions";
import axios from "../../../client";

class ItemCreate extends PureComponent {
  saveItem = item => axios.post("/items", {
    data: {
      type: "items",
      arguments: item
    }
  })

  handleSavedItem = item => {
    this.props.createItem(item);
    this.props.push("/items");
  };

  render() {
    return (
      <div>
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
  push
};

export default connect(undefined, mapDispatchToProps)(ItemCreate);
