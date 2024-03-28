import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styles from './searchInput.module.css';

const SearchInput = ({ searchValue, handleInputChange, handleSearch, showResults }) => {
  const inputClassName = showResults ? styles.searchInputWithResults : styles.searchInput;

  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
      <input
        type="text"
        className={inputClassName}
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.searchButton}>
        <SearchOutlined className={styles.searchIcon} />
      </button>
    </form>
  );
}

export default SearchInput;
