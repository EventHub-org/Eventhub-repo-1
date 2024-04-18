import { message } from "antd";
import authAxios from "./authAxios";

export const createParticipant = async (userId, eventId) => {
  try {
    const response = await authAxios.post(`events/${eventId}/participants`, {
      event_id: eventId,
      user_id: userId,
    });

    return response.data;
  } catch (error) {
    message.error("Error creating participant:", error);
  }
};
