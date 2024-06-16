import axios from "./axios";

export const getCheckbuttonsEvents = async (
  is_my_events,
  is_joined_events,
  is_pending_events,
  is_archive_events
) => {
  const DATA_URL = "/events/checkbox-filter";

  const accessToken = localStorage.getItem("token");

  try {
    const response = await axios.get(DATA_URL, {
      params: {
        my_events: is_my_events,
        joined_events: is_joined_events,
        pending_event: is_pending_events,
        archive_events: is_archive_events,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    
    return response.data;
  } catch (error) {
    console.log("Error:", error.message);
  }
};
