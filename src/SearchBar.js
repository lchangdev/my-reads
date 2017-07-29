import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const SearchBar = props => (
  <div className="search-books-bar">
    <Link
      to="/"
      className="close-search"
    >
      Close
    </Link>
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder="Search by title or author"
        value={props.query}
        onChange={(event) => props.updateQuery(event.target.value)}
      />
    </div>
  </div>
);

SearchBar.propTypes = {
  query: PropTypes.string,
  updateQuery: PropTypes.func
};

export default SearchBar;
