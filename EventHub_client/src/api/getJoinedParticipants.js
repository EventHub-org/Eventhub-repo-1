import { message } from "antd";
import axios from "./axios";

export const getJoinedParticipants = async (eventId) => {
  try {
    const response = await axios.get(`events/${eventId}/participants/joined`);
    return response.data;
  } catch (error) {
    message.error("Error getting participants with photos data");
    console.error(error);
  }
};
