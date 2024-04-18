import { message } from "antd";
import axios from "./axios";

export const getParticipantState = async (userId, eventId) => {
  try {
    const response = await axios.get(
      `events/${eventId}/participants/user_state/${userId}`
    );
    return response.data;
  } catch (error) {
    message.error("Error getting participant state:", error);
  }
};
