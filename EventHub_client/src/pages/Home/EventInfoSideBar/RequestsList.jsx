import { useEffect, useState } from "react";
import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import CloseParticipantButton from "../../../components/Buttons/CloseParticipantButton/CloseParticipantButton";
import GoBackButton from "../../../components/Buttons/GoBackButton/GoBackButton";
import styles from "./RequestsList.module.css";

import { getRequestsByEventId } from "../../../api/getRequestsByEventId";
import { deleteParticipant } from "../../../api/deleteParticipant";
import AcceptParticipantButton from "../../../components/Buttons/AcceptParticipantButton/AcceptParticipantButton";
import { addParticipant } from "../../../api/addParticipant";
const RequestsList = ({
  _event,
  handleGoBackToParticipantsList,
  handleCloseWindow,
  setReloadList,
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
            <li
              className={styles["requested-participant-container"]}
              key={requestedParticipant.id}
            >
              <img
                className={styles["requested-participant-photo"]}
                src={requestedParticipant.participant_photo.photo_url}
                alt="User requestedParticipant img"
              />
              <div className={styles["requested-participant-info-container"]}>
                <div className={styles["full-name"]}>
                  <p>{requestedParticipant.first_name}</p>
                  <p>{requestedParticipant.last_name}</p>
                </div>
                <p className={styles["email"]}>{requestedParticipant.email}</p>
              </div>
              <div className={styles["accept-requested-participant-container"]}>
                <AcceptParticipantButton
                  onClick={() => {
                    addParticipant(
                      requestedParticipant.user_id,
                      _event.id,
                      requestedParticipant.id
                    ).then(() => {
                      setReloadList((prev) => !prev);
                    });
                  }}
                />
              </div>
              <div className={styles["delete-requested-participant-container"]}>
                <CloseParticipantButton
                  onClick={() => {
                    deleteParticipant(requestedParticipant.id, _event.id).then(
                      () => setReloadList((prev) => !prev)
                    );
                  }}
                />
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
