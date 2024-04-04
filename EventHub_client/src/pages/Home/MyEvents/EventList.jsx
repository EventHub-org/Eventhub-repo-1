import styles from './MyEvents.module.css'; 
import React, { useState } from 'react';
import { UserOutlined,CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const EventList = ({events}) => {
    
    const image =  'https://eventhub12.blob.core.windows.net/images/default.jpg?sp=r&st=2024-03-18T06:52:24Z&se=2024-03-24T14:52:24Z&spr=https&sv=2022-11-02&sr=b&sig=nWb0Dzb9%2FWPfAZ6X5MRrwoi%2FxHU8OLe0I6nPtwpBkbQ%3D';

    return (
      <div className={styles.BackgroungContainer}>
        <div className={styles.TitleAndExitButton}>
        <label>
        {"My Events"}
        </label>
        <Button className={styles.ExitButton}>
        </Button>
        </div>
        <div class={styles.CheckboxContainer}>
          <label>
            <div>
            <input 
              type="checkbox" 
            />
            {"My Events"}
            </div>
            <div>
            <input 
              type="checkbox" 
            />
            {"Joined Events"}
            </div>
            <div>
            <input 
              type="checkbox" 
            />
            {"Pending request"}
            </div>
            <div>
            <input 
              type="checkbox" 
            />
            {"Archive"}
            </div>
          </label>
        </div>
        <div className={styles.EventResults}>
        <ul className={styles.ListStyleNone}>
          {events.map(event => (
            <li key={event.id} className={styles.ResultDataContainer}>
              <img src={image} alt="Event" className={styles.EventImage} />
              <div className={styles.EventDescription}>
                <div className={styles.titleAndParticipants}>
                  <h3>{event.title}</h3>
                  <div className={`${styles.details} ${styles.iconTextContainer}`}>
                    <UserOutlined className={styles.icon} />
                    <p>{event.curr_number_of_participants}/{event.max_number_of_participants}</p>
                  </div>
                </div>
                <div className={`${styles.details} ${styles.iconTextContainer}`}>
                  <CalendarOutlined className={styles.icon} />
                  <p>{event.date_start} - {event.date_end}</p>
                </div>
                <div className={`${styles.details} ${styles.iconTextContainer}`}>
                  <ClockCircleOutlined className={styles.icon} />
                  <p>{event.start_time} - {event.end_time}</p>
                </div>
                <div className={`${styles.details} ${styles.iconTextContainer}`}>
                  <EnvironmentOutlined className={styles.icon} />
                  <p>{event.location}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>   
    );
};
  
export default EventList;
