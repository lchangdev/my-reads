import * as BooksAPI from './BooksAPI'
import React from 'react'
import update from 'immutability-helper';
import { indexOf } from 'lodash';
import { Link, Route } from 'react-router-dom';

import './App.css'
import Bookshelf from './Bookshelf';
import Search from './Search';

class BooksApp extends React.Component {
  constructor() {
    super();

    this.state = { books: [] };

    this.onChangeShelf = this.onChangeShelf.bind(this);
  }

  onChangeShelf(event, book) {
    const index = indexOf(this.state.books, book);
    const shelf = event.target.value;

    let updates = {
      books: update(this.state.books, {$push: [ book ]})
    }

    if (index >= 0) {
      updates = {
        books: update(this.state.books, {
          [index]: {
            shelf: { $apply: () => shelf }
          }
        })
      };
    }

    this.setState(() => (updates));

    BooksAPI.update(book, shelf);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Bookshelf
                  books={this.state.books}
                  onChangeShelf={this.onChangeShelf}
                  shelf="Currently Reading"
                />
                <Bookshelf
                  books={this.state.books}
                  onChangeShelf={this.onChangeShelf}
                  shelf="Want to Read"
                />
                <Bookshelf
                  books={this.state.books}
                  onChangeShelf={this.onChangeShelf}
                  shelf="Read"
                />
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />

        <Route
          exact
          path="/search"
          render={() => (
            <Search
              books={this.state.books}
              onChangeShelf={this.onChangeShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
