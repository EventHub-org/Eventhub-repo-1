import styles from "./ApplyChangesButton.module.css";

const ApplyChangesButton = ({onClick}) =>{
    return(
        <button onClick={onClick} className={styles.ApplyChangesButton}>Apply changes</button>
    );
}

export default ApplyChangesButton