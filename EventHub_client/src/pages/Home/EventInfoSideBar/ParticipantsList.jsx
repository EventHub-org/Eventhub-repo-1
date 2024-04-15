import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ParticipantsList.module.css";

import { getUserParticipants } from "../../../api/getUserParticipants";
import { getUserById } from "../../../api/getUserById";

import GoBackButton from "../../../components/Buttons/GoBackButton/GoBackButton";
import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import CloseParticipantButton from "../../../components/Buttons/CloseParticipantButton/CloseParticipantButton";
import OwnerPhotoOverlay from "../../../components/OwnerPhotoOverlay/OwnerPhotoOverlay";
import { deleteParticipant } from "../../../api/deleteParticipant";
import SpotsLeft from "../../../components/Spots/SpotsLeft";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";

const ParticipantsList = ({
  handleGoBackToSideBar,
  handleCloseWindow,
  userId,
  setReloadList,
  _event,
}) => {
  // States
  const [participants, setParticipants] = useState([]);
  const [owner, setOwner] = useState(null);

  // Params
  const { ownerId, eventId } = useParams();

  // Effects

  useEffect(() => {
    _event &&
      getUserParticipants(_event.id).then((data) => setParticipants(data));
  }, [_event]);

  useEffect(() => {
    _event && getUserById(_event.owner_id).then((data) => setOwner(data));
  }, [_event]);

  return (
    _event && (
      <div className={styles["participants-list-container"]}>
        <div className={styles["header"]}>
          <GoBackButton
            className={styles["back-btn"]}
            onClick={handleGoBackToSideBar}
          />
          <CloseWindowButton
            className={styles["back-btn"]}
            onClick={handleCloseWindow}
          />
        </div>

        <ul className={styles["participants-container"]}>
          {owner &&
            participants.find(
              (participant) => participant.user_id === ownerId
            ) && <OwnerPhotoOverlay owner={owner} />}
          {participants.map(
            (participant) =>
              participant.user_id !== ownerId && (
                <li
                  key={participant.id}
                  className={styles["participant-container"]}
                >
                  <img
                    className={styles["participant-photo"]}
                    src={participant.participant_photo.photo_url}
                    alt="User participant img"
                  />
                  <div className={styles["participant-info-container"]}>
                    <div className={styles["full-name"]}>
                      <p>{participant.first_name}</p>
                      <p>{participant.last_name}</p>
                    </div>
                    <p className={styles["email"]}>{participant.email}</p>
                  </div>
                  {userId === ownerId && (
                    <div className={styles["delete-participant-container"]}>
                      <CloseParticipantButton
                        onClick={() => {
                          deleteParticipant(participant.id, eventId).then(() =>
                            setReloadList((prev) => !prev)
                          );
                        }}
                      />
                    </div>
                  )}
                </li>
              )
          )}
        </ul>
        <div className={styles["lower-container"]}>
          <SpotsLeft event={_event} />
          <PrimaryButton className={styles["requests-btn"]}>
            Requests
          </PrimaryButton>
        </div>
      </div>
    )
  );
};

export default ParticipantsList;
