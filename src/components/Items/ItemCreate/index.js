import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ItemForm from "../ItemForm";
import { createItem } from "../../../store/item/actions";
import axios from "../../../client";

class ItemCreate extends PureComponent {
  saveItem = values =>
    Promise.resolve().then(() => ({
      data: {
        item: {
          id: new Date().getTime(),
          ...values
        }
      }
    }));

  handleSavedItem = item => {
    axios.post("/items", { type: "item", arguments: item }).then(response => {
      this.props.createItem(response.data);
      this.props.push("/items");
    });
  };

  render() {
    return (
      <div>
        <h1>Add new workshop/presentation</h1>

        <ItemForm saveItem={this.saveItem} onItemSaved={this.handleSavedItem} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  createItem,
  push
};

export default connect(undefined, mapDispatchToProps)(ItemCreate);
