import styles from "./ResendButton.module.css";

const ResendButton = ({onClick}) =>{
    return(
        <button onClick={onClick} className={styles.ApplyChangesButton}>Resend Email</button>
    );
}

export default ResendButton