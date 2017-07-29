import PropTypes from 'prop-types';
import React from 'react';
import { camelCase } from 'lodash';
import Book from './Book';

const Bookshelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelf}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          props.books
            .filter((book) => (book.shelf === camelCase(props.shelf)))
            .map((book, index) => (
              <li key={index}>
                <Book
                  book={book}
                  onChangeShelf={props.onChangeShelf}
                />
              </li>
            ))
        }
      </ol>
    </div>
  </div>
);

Bookshelf.propTypes = {
  books: PropTypes.array,
  onChangeShelf: PropTypes.func,
  shelf: PropTypes.string
};

export default Bookshelf;
