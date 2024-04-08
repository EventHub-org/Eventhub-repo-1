import React, { useState } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { RoundButton } from '../../../components/Buttons/RoundButton/roundButton';
import styles from './MyEvents.module.css';
import EventList from './MyEventList';

const MyEvents = () => {
    const [showResults, setShowResults] = useState(false);

    const handleButtonClick = async () => {
        setShowResults(!showResults);
    }

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterButtonContainer}>
                <RoundButton
                    onClick={handleButtonClick}
                    icon={<CalendarOutlined />}
                />
            </div>
            {showResults && 
            <EventList handleButtonClick={handleButtonClick}/>}
        </div>
    );
};

export default MyEvents;