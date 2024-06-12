import { useNavigate, useParams } from "react-router-dom";
import styles from "./EventSideBarList.module.css";

import CloseParticipantButton from "./CloseParticipantButton/CloseParticipantButton";

import { deleteParticipant } from "../../../api/deleteParticipant";

import { message } from "antd";
import AcceptParticipantButton from "./AcceptParticipantButton/AcceptParticipantButton";
import { addParticipant } from "../../../api/addParticipant";

const EventSideBarList = ({
  isOwner,
  showApprove,
  setReloadList,
  _event,
  users,
}) => {
  // Params
  const { eventId } = useParams();

  const navigate = useNavigate();

  return (
    _event &&
    users && (
      <div className={styles["users-list-container"]}>
        <ul className={styles["users-container"]}>
          {users.map(
            (user) =>
              user.user_id !== _event.owner_id && (
                <li key={user.id} className={styles["user-container"]}>
                  <img
                    onClick={() => navigate(`/profile/${user.username}`)}
                    className={styles["user-photo"]}
                    src={user.participant_photo.photo_url}
                    alt="User user img"
                  />
                  <div className={styles["user-info-container"]}>
                    <p className={styles["username"]}>{`@${user.username}`}</p>
                    <div className={styles["full-name"]}>
                      <p>{user.first_name}</p>
                      <p>{user.last_name}</p>
                    </div>
                  </div>
                  {isOwner && (
                    <>
                      {showApprove && (
                        <div
                          className={styles["accept-requested-user-container"]}
                        >
                          <AcceptParticipantButton
                            onClick={() => {
                              addParticipant(_event.id, user.id)
                                .then(() => {
                                  setReloadList((prev) => !prev);
                                })
                                .catch((error) => {
                                  if (error.response) {
                                    const responseData = error.response.data;
                                    if (
                                      typeof responseData === "string" &&
                                      responseData.includes("is full")
                                    ) {
                                      message.info("Event is full");
                                    } else {
                                      message.error("An error occurred");
                                    }
                                  } else {
                                    message.error("An error occurred");
                                  }
                                });
                            }}
                          />
                        </div>
                      )}
                      <div className={styles["delete-user-container"]}>
                        <CloseParticipantButton
                          onClick={() => {
                            deleteParticipant(user.id, eventId)
                              .then(() => setReloadList((prev) => !prev))
                              .catch((error) =>
                                message.error("An error occured")
                              );
                          }}
                        />
                      </div>
                    </>
                  )}
                </li>
              )
          )}
        </ul>
      </div>
    )
  );
};

export default EventSideBarList;
