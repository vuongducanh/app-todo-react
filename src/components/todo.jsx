import React, { Component } from 'react';
import './todo.scss';
import ListItem from './list-item/list-item';

class Todo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      showAddTask: false,
      valueSelectAddItem: "Small",
      itemSelected: null,
      hideButtonUpdate: true,
      getIndexItem: 0,

      valueSortItem: [
        { name: 'sort by', id: 1 },
        { name: 'low to high', id: 2 },
        { name: 'high to low', id: 3 },
      ],

      valuesOptionAddtask: [
        { name: 'Small', id: 1 },
        { name: 'Medium', id: 2 },
        { name: 'Hight', id: 3 },
      ]
    };
  }

  componentWillMount() {
    var arrayItem = JSON.parse(localStorage.getItem('dataItem'));
    if (arrayItem !== null) {
      this.setState({
        items: arrayItem
      })
    }
  }

  saveDataLocalStorage() {
    setTimeout(() => {
      localStorage.setItem('dataItem', JSON.stringify(this.state.items));
    },350);
  }

  addItemSubmit () {
    if (this.inputElement.value !== "") {
      var newItem = {
        value: this.inputElement.value,
        key: Date.now(),
        level: this.state.valueSelectAddItem
      }

      this.setState({
        items: this.state.items.concat(newItem)
      })

      this.saveDataLocalStorage();

      this.inputElement.value = "";
    }
  }

  handleAddItem = (e) => {
   if (this.state.hideButtonUpdate) {
     this.addItemSubmit()
   }
    e.preventDefault();
  }

  showInputAdd = () => {
    const isOpened = this.state.showAddTask;

    this.setState({
      showAddTask: !isOpened
    });
  }

  hideInputAdd = () => {
    this.setState({
      showAddTask: false
    });
  }

  deleteItem = (key) => {
    var filterItem = this.state.items.filter(e => e.key !== key);

    // filterItem trả về một Array ngoại trừ key thằng mình vừa click vào

    this.setState({
      items: filterItem
    })

    this.saveDataLocalStorage();
  }

  handleChange = (event) => {
    this.setState({
      valueSelectAddItem: event.target.value
    });
  }

  editItem = (item) => {
    this.setState({
      showAddTask: true,
      valueSelectAddItem: item.level,
      hideButtonUpdate: false
    })

    this.inputElement.value = item.value;
  }

  updateValueItem = (index) => {
      let updateValueItem = this.state.items;
      updateValueItem[index].value = this.inputElement.value;

      this.setState({
        getIndexItem : index,
        items: updateValueItem,
        hideButtonUpdate: true
      })

      this.saveDataLocalStorage();
  }

  render() {
    let optionSortItem = this.state.valueSortItem.map((value, index) => (
      <option value={value.name} key={index}>{value.name}</option>
    ));

    let optionTemplateAddItem = this.state.valuesOptionAddtask.map((value, index) => (
      <option value={value.name} key={index}>{value.name}</option>
    ));

    return (
      <div className="todo">
        <div className="todo__container">
          <h1 className="todo__heading">Project Todo List</h1>

          <div className="todo__control">
            <div className="todo__control-item">
              <input className="todo__input" type="text"  placeholder="search for ..."/>
              <button className="todo__button-search">Go!</button>
            </div>

            <div className="todo__control-item">
              <select value={this.state.value} className="todo__sort">
                {optionSortItem}
              </select>
            </div>
            <div className="todo__control-item">
              <button className="todo__add" onClick={this.showInputAdd}>Add task</button>
            </div>
          </div>

          <form onSubmit={this.handleAddItem} className={this.state.showAddTask ? 'show' : 'hide'}>
            <div className="todo__section">
              <input type="text" defaultValue={this.state.itemSelected} ref={(a) => this.inputElement = a}
                className="todo__input-add"
                placeholder="Enter Task"/>
              <select className="todo__input-choose" onChange={this.handleChange} value={this.state.valueSelectAddItem}>
                {optionTemplateAddItem}
              </select>
              {this.state.hideButtonUpdate ? <input type="submit"  className="todo__submit" value="Submit"/> : <input type="submit" className="todo__submit" onClick={() => this.updateValueItem(this.state.getIndexItem)} value="Update"/> }
              <input type="button" className="todo__cancel" onClick={this.hideInputAdd} value='cancel'/>
            </div>
          </form>


          <div className="todo__list">
            <div className="todo__list-header">
              list task
            </div>

            <div className="todo__header">
              <div className="todo__header-number">#</div>
              <div className="todo__header-task">Task</div>
              <div className="todo__header-level">level</div>
              <div className="todo__header-action">Action</div>
            </div>

            <ListItem
            updateValueItem = {this.updateValueItem}
            itemResult={this.state.items}
            editItem  = {this.editItem}
            removeItem={this.deleteItem}>
            </ListItem>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
