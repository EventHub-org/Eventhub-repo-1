import { useEffect, useState } from "react";
import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import GoBackButton from "../../../components/Buttons/GoBackButton/GoBackButton";
import styles from "./RequestsList.module.css";

import { getRequestsByEventId } from "../../../api/getRequestsByEventId";
const RequestsList = ({
  _event,
  handleGoBackToParticipantsList,
  handleCloseWindow,
}) => {
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    getRequestsByEventId(_event.id).then((data) => setRequests(data));
  }, [_event]);
  return (
    <div className={styles["requests-list-container"]}>
      <div className={styles["header"]}>
        <GoBackButton onClick={handleGoBackToParticipantsList} />
        <CloseWindowButton onClick={handleCloseWindow} />
      </div>
      {requests && (
        <ul className={styles["requests-list"]}>
          {requests.map((requestedParticipant) => (
            <li key={requestedParticipant.id}>
              <img
                className={styles["participant-photo"]}
                src={requestedParticipant.participant_photo.photo_url}
                alt="User requestedParticipant img"
              />
              <div className={styles["requestedParticipant-info-container"]}>
                <div className={styles["full-name"]}>
                  <p>{requestedParticipant.first_name}</p>
                  <p>{requestedParticipant.last_name}</p>
                </div>
                <p className={styles["email"]}>{requestedParticipant.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={styles["lower-container"]}></div>
    </div>
  );
};

export default RequestsList;
