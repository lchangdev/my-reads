import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEmpty } from 'lodash';

class Book extends Component {
  authors(book) {
    return isEmpty(book.authors) ? '' : book.authors.map((author) => (author));
  }

  thumbnails(book) {
    if (isEmpty(book.imageLinks)) {
      return '';
    }

    return book.imageLinks.thumbnail || book.imageLinks.smallThumbnail;
  }

  render() {
    const { book, onChangeShelf } = this.props;

    if (isEmpty(book)) {
      return (<div />);
    }

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${this.thumbnails(book)}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              onChange={(event) => onChangeShelf(event, book)}
            >
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
          {this.authors(book)}
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object,
  onChangeShelf: PropTypes.func
};

export default Book;
