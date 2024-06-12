import styles from "./ParticipantsList.module.css";

import OwnerPhotoOverlay from "../../../components/OwnerPhotoOverlay/OwnerPhotoOverlay";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import RequestsCount from "../../../components/RequestsCount/RequestsCount";
import EventSideBarList from "./EventSideBarList";
import EmptyListMessage from "./EmptyListMessage";

const ParticipantsList = ({
  handleShowRequests,
  isOwner,
  setReloadList,
  requests,
  _event,
  participants,
  owner,
}) => {
  return (
    _event &&
    participants && (
      <div>
        {participants.length === 0 && (
          <EmptyListMessage
            message={"Here will be shown participants for this event..."}
          />
        )}
        {owner &&
          participants.find(
            (participant) => participant.user_id === owner.id
          ) && <OwnerPhotoOverlay owner={owner} />}

        <EventSideBarList
          isOwner={isOwner}
          setReloadList={setReloadList}
          _event={_event}
          users={participants}
        />

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
    )
  );
};

export default ParticipantsList;
