import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      results: []
    };

    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery(query) {
    this.setState({ query }, () => this.updateResults());
  }

  updateResults() {
    if (isEmpty(this.state.query)) {
      this.setState({ results: [] });

      return;
    }

    BooksAPI
      .search(encodeURIComponent(this.state.query))
      .then((results) => {
        if (results.error)  {
          return;
        }

        this.setState({ results });
      });
  }

  render() {
    const { query, results } = this.state;

    return (
      <div className="search-books">
        <SearchBar
          query={query}
          updateQuery={this.updateQuery}
        />
        <SearchResults
          books={this.props.books}
          onChangeShelf={this.props.onChangeShelf}
          results={results}
        />
      </div>
    );
  }
}

Search.propTypes = {
  books: PropTypes.array,
  onChangeShelf: PropTypes.func
};

export default Search;
