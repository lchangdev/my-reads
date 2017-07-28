import PropTypes from 'prop-types';
import React from 'react';
import { camelCase } from 'lodash';
import Book from './Book';

const Bookshelf = props => {
  const { books, onChangeShelf, shelf } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books
              .filter((book) => (book.shelf === camelCase(shelf)))
              .map((book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    onChangeShelf={onChangeShelf}
                  />
                </li>
              ))
          }
        </ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  books: PropTypes.array,
  onChangeShelf: PropTypes.func
};

export default Bookshelf;
