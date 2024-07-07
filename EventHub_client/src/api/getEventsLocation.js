import axios from "./axios";

export const getEventsData = async () => {
  try {
    const response = await axios.get(`/events/all-live-upcoming`);
    return response.data;
  } catch (error) {
    console.log("Error getting events data", error);
  }
};
