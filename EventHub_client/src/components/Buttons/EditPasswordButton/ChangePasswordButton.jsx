import React from 'react';
import styles from './ChangePasswordButton.module.css';

const ChangePasswordButton = ({onClick}) => {
  return(
    <button className={styles.ChangePasswordButton} onClick={onClick}>Change password</button>
  );
};

export default ChangePasswordButton;
