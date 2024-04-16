import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import GoBackButton from "../../../components/Buttons/GoBackButton/GoBackButton";
import styles from "./RequestsList.module.css";
const RequestsList = () => {
  return (
    <div className={styles["requests-list-container"]}>
      <div className={styles["header"]}>
        <GoBackButton />
        <CloseWindowButton />
      </div>
      <ul className={styles["requests-list"]}></ul>
      <div className={styles["lower-container"]}></div>
    </div>
  );
};

export default RequestsList;
