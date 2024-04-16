import styles from "./AcceptParticipantButton.module.css";
import { FaCheck } from "react-icons/fa6";

const AcceptParticipantButton = ({ onClick }) => {
  return (
    <button className={styles["btn"]} onClick={onClick}>
      <FaCheck className={styles["btn-icon"]} size="1.5em" />
    </button>
  );
};

export default AcceptParticipantButton;
