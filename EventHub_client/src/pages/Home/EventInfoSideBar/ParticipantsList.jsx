import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ParticipantsList.module.css";

import GoBackButton from "../../../components/Buttons/GoBackButton/GoBackButton";
import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import CloseParticipantButton from "./CloseParticipantButton/CloseParticipantButton";
import OwnerPhotoOverlay from "../../../components/OwnerPhotoOverlay/OwnerPhotoOverlay";
import { deleteParticipant } from "../../../api/deleteParticipant";
import SpotsLeft from "../../../components/Spots/SpotsLeft";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import RequestsCount from "../../../components/RequestsCount/RequestsCount";
import { message } from "antd";
import EventSideBarList from "./EventSideBarList";

const ParticipantsList = ({
  handleGoBackToSideBar,
  handleCloseWindow,
  handleShowRequests,
  isOwner,
  setReloadList,
  requests,
  _event,
  participants,
  owner,
}) => {
  // Params
  const { eventId } = useParams();

  const navigate = useNavigate();

  return (
    _event &&
    participants && (
      <div className={styles["participants-list-container"]}>
        <div className={styles["header"]}>
          <GoBackButton onClick={handleGoBackToSideBar} />
          <CloseWindowButton onClick={handleCloseWindow} />
        </div>

        <EventSideBarList
          isOwner={isOwner}
          setReloadList={setReloadList}
          _event={_event}
          users={participants}
        />
        <div className={styles["lower-container"]}>
          <SpotsLeft event={_event} />
          {isOwner && (
            <PrimaryButton
              onClick={handleShowRequests}
              className={styles["requests-btn"]}
            >
              {requests.length > 0 && (
                <div className={styles["requests-count-container"]}>
                  <RequestsCount requestsLength={requests.length} />
                </div>
              )}
              Requests
            </PrimaryButton>
          )}
        </div>
      </div>
    )
  );
};

export default ParticipantsList;
