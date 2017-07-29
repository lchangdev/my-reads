import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { includes } from 'lodash';

import Book from './Book';

class SearchResults extends Component {
  mergeResults() {
    const { books, results } = this.props;

    const bookIds = books.map(book => book.id);

    return results.map(result => {
      if (includes(bookIds, result.id)) {
        return books.filter(book => book.id === result.id)[0];
      }

      return result;
    });
  }

  render() {
    const mergedResults = this.mergeResults();

    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {
            mergedResults.map((result, index) => (
              <li key={index}>
                <Book
                  book={result}
                  onChangeShelf={this.props.onChangeShelf}
                />
              </li>
            ))
          }
        </ol>
      </div>
    );
  }
}

SearchResults.propTypes = {
  books: PropTypes.array,
  results: PropTypes.array
};

export default SearchResults;
