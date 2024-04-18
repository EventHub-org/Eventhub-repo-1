import { message } from "antd";
import axios from "./axios";

export const getUserParticipants = async (eventId) => {
  try {
    const response = await axios.get(`events/${eventId}/participants/users`);
    return response.data;
  } catch (error) {
    message.error("Error getting participants with photos data:", error);
  }
};
