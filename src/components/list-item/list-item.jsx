import React, { Component } from 'react';
import './list-item.scss';
import FlipMove from "react-flip-move";

class ListItem extends Component {

  deleteItem(key) {
    this.props.removeItem(key);
  }

  handleEdit(item, index) {
    this.props.editItem(item);
    // check true false run
    this.props.updateValueItem(index);
  }

  itemsResult() {
    var totoEntries = this.props.itemResult;

    var todoItem =  totoEntries.map((item,index) =>
      <div className="list-item" key={item.key}>
        <div className="list-item-count">{index + 1}</div>
        <div className="list-item-task">{item.value}</div>
        <div className="list-item-level">{item.level}</div>
        <div className="list-item-action">
          <div className="list-item-edit" onClick={() => this.handleEdit(item, index)}>Edit</div>
          <div className="list-item-remove" onClick={() => this.deleteItem(item.key)}>Delete</div>
        </div>
      </div>
    )
    return todoItem;
  }

  render() {
    return (
      <div>
        <FlipMove duration={250} easing="ease-out">
        {this.itemsResult()}
        </FlipMove>
      </div>
    );
  }
}

export default ListItem;
