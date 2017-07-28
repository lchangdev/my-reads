import PropTypes from 'prop-types';
import React from 'react';

const Book = props => {
  const { book, onChangeShelf } = props;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${book.imageLinks.thumbnail}")`
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={book.shelf}
            onChange={(event) => onChangeShelf(event, book)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors.map((author) => (author))}
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object,
  onChangeShelf: PropTypes.func
};

export default Book;
