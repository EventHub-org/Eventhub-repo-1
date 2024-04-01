import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styles from './Search.module.css';
import SearchInput from './SearchInput';
import ListEvents from '../../../components/ListEvents/ListEvents'; 
import { getEventsDataSearch } from '../../../api/getEventsData';
import { useSearchParams } from 'react-router-dom';
import { Map } from '../Map/Map';

const SearchEvents = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [eventsData, setEventsData] = useState([]); 
  const [searchParams, setSearchParams] = useSearchParams();
  const searchContainerRef = useRef(null); 
  

  const handleSearch = async (event) => {
    event.preventDefault();
    // Перевірка, чи не є searchValue порожнім рядком(враховуючи пробіли)
    if (searchValue.trim() !== '') {
      try {
        const data = await getEventsDataSearch(searchValue);
        setEventsData(data);
        setSearchParams({ search: searchValue});
        setShowResults(true);
      } catch(error) {
        console.error('Error getting events data:', error);
      }
    }
  };
  
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    setSearchParams({});
    setShowResults(false);
  };

  const handleClickOutside = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      setSearchParams({});
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
          {eventsData.length === 0 ? (
            <p className={styles.NoResultsText}>No results found for "{searchValue}"</p>
          ) : (
            <ListEvents eventsData={eventsData}/>
          )}
      </div>
      )) : null}
    </div>
  );
};

export default SearchEvents;
