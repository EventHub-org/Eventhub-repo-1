import axios from "./axios";
import { refreshToken } from "../jwt/refreshToken";

export const getCheckbuttonsEvents = async (
  is_my_events,
  is_joined_events,
  is_pending_events,
  is_archive_events
) => {
  const DATA_URL = "/events/checkbox-filter";

  const accessToken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      DATA_URL,
      {
        user_id: null,
        is_my_events,
        is_joined_events,
        is_pending_events,
        is_archive_events,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    await handleApiError(error);
  }
};

const handleApiError = async (error) => {
  console.log("Error object:", error.response.data);
  if (error.response && error.response.status === 403) {
    console.log("JWT expired. Generating new token");
    await refreshToken();
    // if (error.message.includes("JWT expired")) {
    //   console.log("JWT expired. Generating new token");
    //   await refreshToken();
    // } else {
    //   console.log("Forbidden access error:", error.message);
    // }
  } else {
    console.log("Error:", error.message);
  }
};
