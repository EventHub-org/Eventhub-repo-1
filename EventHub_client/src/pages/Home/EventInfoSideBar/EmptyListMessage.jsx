import styles from "./EmptyListMessage.module.css";

const EmptyListMessage = ({ message }) => {
  return <div className={styles["message"]}>{message}</div>;
};

export default EmptyListMessage;
