import * as BooksAPI from './BooksAPI'
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

  updateResults() {
    if (isEmpty(this.state.query)) {
      this.setState({ results: [] });

      return;
    }

    BooksAPI
      .search(this.state.query)
      .then((results) => {
        if (results.error)  {
          return;
        }

        this.setState({ results });
      });
  }

  updateQuery(query) {
    this.setState({ query }, () => this.updateResults());
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
          query={query}
          results={results}
        />
      </div>
    );
  }
}

export default Search;
