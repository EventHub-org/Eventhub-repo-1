import React from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./searchInput.module.css";

const SearchInput = ({
  searchValue,
  handleInputChange,
  handleSearch,
  showResults,
  handleClearButtonClick,
  searchedValue,
}) => {
  const inputClassName = showResults
    ? styles["search-input-with-results"]
    : styles["search-input"];

  return (
    <form className={styles["search-form"]} onSubmit={handleSearch}>
      <input
        type="text"
        className={inputClassName}
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
      />
      {showResults && searchedValue && (
        <button
          type="button"
          className={styles["clear-btn"]}
          onClick={handleClearButtonClick}
        >
          <CloseOutlined />
        </button>
      )}
      <button type="submit" className={styles["search-btn"]}>
        <SearchOutlined className={styles["search-icon"]} />
      </button>
    </form>
  );
};

export default SearchInput;
