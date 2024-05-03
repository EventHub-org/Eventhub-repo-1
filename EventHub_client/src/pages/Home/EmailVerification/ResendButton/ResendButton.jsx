import styles from "./ResendButton.module.css";

const ResendButton = ({onClick, isDisabled}) =>{
    return(
        <button onClick={onClick} className={styles.ApplyChangesButton} disabled={isDisabled}>Resend Email</button>
    );
}

export default ResendButton