import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styles from './Search.module.css';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults'; 
import { getEventsData } from '../../../api/getEventsData';

const SearchEvents = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [eventsData, setEventsData] = useState([]); 
  const searchContainerRef = useRef(null); 

  const handleSearch = async (event) => {
    event.preventDefault();
    // Перевірка, чи не є searchValue порожнім рядком(враховуючи пробіли)
    if (searchValue.trim() !== '') {
      try {
        const data = await getEventsData(searchValue);
        setEventsData(data);
        setShowResults(true);
      } catch(error) {
        console.error('Error getting events data:', error);
      }
    }
  };
  
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    setShowResults(false);
  };

  const handleClickOutside = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); 

  return (
    <div className={`${styles.SearchContainer} ${showResults ? styles.active : styles.inactive}`} ref={searchContainerRef}>
      <div className={styles.SearchInput} >
        <SearchInput
          searchValue={searchValue}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          showResults = {showResults}
        />
      </div>
      {showResults ? (( 
        <div className={styles.ResultsContainer}>
        <div className={styles.SearchResults}>
          {eventsData.length === 0 ? (
            <p className={styles.NoResultsText}>No results found for "{searchValue}"</p>
          ) : (
            <SearchResults eventsData={eventsData}/>
          )}
        </div>
      </div>
      )) : null}
    </div>
  );
};

export default SearchEvents;
