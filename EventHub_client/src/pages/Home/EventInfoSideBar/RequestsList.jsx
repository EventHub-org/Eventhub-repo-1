// import styles from "./RequestsList.module.css";

import EventSideBarList from "./EventSideBarList";
import EmptyListMessage from "./EmptyListMessage";
const RequestsList = ({ _event, requests, setReloadList }) => {
  return (
    <div>
      {requests.length === 0 && (
        <EmptyListMessage
          message={"Currently, there are no requests for this event.."}
        />
      )}
      <EventSideBarList
        isOwner
        showApprove
        setReloadList={setReloadList}
        _event={_event}
        users={requests}
      />
    </div>
  );
};

export default RequestsList;
