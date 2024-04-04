import React, { useState } from 'react';
import { Menu, Dropdown, Select, Input, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { RoundButton } from '../../../components/Buttons/RoundButton/roundButton';
import styles from './MyEvents.module.css';
import EventList from './EventList';

const MyEvents = () => {
    const results = [
        { id: 1, title: 'Football tournament', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
        { id: 2, title: 'Event 2', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
        { id: 3, title: 'Event 2', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
        { id: 4, title: 'Event 2', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
        { id: 5, title: 'Event 2', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
        { id: 6, title: 'Event 2', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
        { id: 7, title: 'Event 2', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
        { id: 8, title: 'Event 2', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
        { id: 9, title: 'Event 2', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
        { id: 10, title: 'Event 2', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
        { id: 11, title: 'Event 2', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
        { id: 12, title: 'Event 2', date_start: '12.03', date_end: "31.03", start_time: "10:00", end_time: "21:00", location: "Lviv, Shevchenka, 51", curr_number_of_participants: "7", max_number_of_participants: "12", image: '/images/test_event_image.png' },
    ];

    const [events, setEvents] = useState([])
    const [showResults, setShowResults] = useState(false);

    const fetchData = (value) => {
        fetch("")
    }

    const handleButtonClick = () => {
        setShowResults(true);
    }

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterButtonContainer}>
                <RoundButton
                    onClick={handleButtonClick}
                    icon={<CalendarOutlined />}
                />
            </div>
            {showResults && <EventList events={results} />}
        </div>
    );
};

export default MyEvents;
