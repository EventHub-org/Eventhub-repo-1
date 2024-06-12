import styles from "./RequestsList.module.css";

import EventSideBarList from "./EventSideBarList";
const RequestsList = ({ _event, requests, setReloadList }) => {
  return (
    <div className={styles["requests-list-container"]}>
      {requests.length === 0 && (
        <div className={styles["no-requests-msg"]}>
          Currently, there are no requests for this event..
        </div>
      )}
      <EventSideBarList
        isOwner={true}
        showApprove={true}
        setReloadList={setReloadList}
        _event={_event}
        users={requests}
      />
    </div>
  );
};

export default RequestsList;
