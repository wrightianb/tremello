import React from 'react';
import List from './List';
import ListForm from './ListForm';

class Board extends React.Component {
  state = { lists: [] }

  componentDidMount = () => {
    $.ajax({
      url: '/api/lists',
      type: 'GET',
      dataType: 'JSON'
    }).done( lists => {
      this.setState({ lists });
    }).fail( data => {
      console.log(data);
    });
  }

  addList = (title) => {
    $.ajax({
      url: 'api/lists',
      type: 'POST',
      dataType: 'JSON',
      data: { list: {title}}
    }).done( list => {
      this.setState({ lists: [...this.state.lists, list]})
    }).fail( data => {
      console.log(data);
    });
  }

  updateList = (updatedList) => {
    $.ajax({
      url: `/api/lists/${updatedList.id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { list: { title: updatedList.title }}
    }).done( updatedList => {
      let lists = this.state.lists.map( list => {
        return list.id === updatedList.id ? updatedList : list;
      });
      this.setState({ lists });
    }).fail( data => {
      console.log(data);
    });
  }

  destroyList = (id) => {
    $.ajax({
      url: `api/lists/${id}`,
      type: 'DELETE'
    }).done( data => {
      this.setState({ lists: this.state.lists.filter( list => {
        return list.id !== id;
        })
      });
    }).fail( data => {
      console.log(data);
    });
  }

  displayLists = () => {
    return this.state.lists.map( list => {
        return (
          <List
            key={list.id}
            list={list}
            updateList={this.updateList}
            destroyList={this.destroyList}
          />
        )
      });
  }

  render() {
    return(
      <div className="board">
        { this.displayLists() }
        <ListForm addList={this.addList} />
      </div>
    );
  }
}

export default Board
