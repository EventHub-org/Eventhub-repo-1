import styles from "./RequestsCount.module.css";
const RequestsCount = ({ requestsLength }) => {
  return <div className={styles["requests-count"]}>{requestsLength}</div>;
};

export default RequestsCount;
