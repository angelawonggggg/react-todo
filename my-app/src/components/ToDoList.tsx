import ToDoItem from "./ToDoItem";
import React from "react";

type ToDoListType = {
  itemList: string[];
  text: string;
  completedItem: string[];
};

export default class ToDoList extends React.Component {
  state: ToDoListType = {
    itemList: [],
    text: "",
    completedItem: [],
  };

  removeItem(itemToRemove: string) {
    let itemList = this.state.itemList.filter((item) => itemToRemove !== item);
    let completedItem = this.state.completedItem.slice();
    completedItem.push(itemToRemove);
    this.setState({
      itemList,
      completedItem,
    });
  }

  addItem() {
    if (this.state.text.trim().length === 0) {
      return;
    } else {
      this.setState({
        itemList: [...this.state.itemList, this.state.text],
        text: "",
      });
    }
  }

  setText(value: string) {
    this.setState({
      text: value,
    });
  }

  deleteItem(idx: number) {
    let newItemList = this.state.itemList.slice();
    newItemList.splice(idx, 1);
    this.setState({
      itemList: newItemList,
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="card">
            <h2>My to do list</h2>

            <input
              value={this.state.text}
              onChange={(e) => this.setText(e.target.value)}
            />
            <span className="button" onClick={() => this.addItem()}>
              Add
            </span>
            <p className="count">Total items: {this.state.itemList.length}</p>
            {this.state.itemList.map((item, i) => (
              <ToDoItem
                key={item}
                item={item}
                onComplete={() => this.removeItem(item)}
                onDelete={() => this.deleteItem(i)}
              />
            ))}
          </div>

          <div className="card">
            <h2>Completed items</h2>
            <p className="count">
              Total completed items: {this.state.completedItem.length}
            </p>
            {this.state.completedItem.map((item) => (
              <li className="completedItem">{item}</li>
            ))}
          </div>

          {/* <div className="card">
            <h2>My vocabs</h2>
            <Form />
          </div> */}
        </div>
      </div>
    );
  }
}
