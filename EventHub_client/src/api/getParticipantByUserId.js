import { message } from "antd";
import authAxios from "./authAxios";

export const getParticipantByUserId = async (userId, eventId) => {
  try {
    const response = await authAxios.get(
      `events/${eventId}/participants/user/${userId}`
    );
    return response.data;
  } catch (error) {
    message.error("Error getting participant by user id");
    console.error(error);
  }
};
