import { message } from "antd";
import authAxios from "./authAxios";

export const getParticipantState = async (eventId) => {
  try {
    const response = await authAxios.get(
      `events/${eventId}/participants/user_state`
    );
    return response.data;
  } catch (error) {
    message.error("Error getting participant state");
    console.error(error);
  }
};
