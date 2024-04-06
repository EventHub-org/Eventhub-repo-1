import styles from "./OwnerPhotoOverlay.module.css";

const OwnerPhotoOverlay = ({ owner, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={styles["owner-container"]}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        className={styles["owner-img"]}
        src={owner.photo_responses[0].photo_url}
        alt=""
      />
      <div className={styles["info-container"]}>
        <div className={styles["full-name-container"]}>
          {`${owner.first_name} ${owner.last_name}`}
          <p>- creator</p>
        </div>
        <div className={styles["email"]}>{owner.email}</div>
      </div>
    </div>
  );
};

export default OwnerPhotoOverlay;
