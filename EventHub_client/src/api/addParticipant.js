import { message } from "antd";
import authAxios from "./authAxios";

export const addParticipant = async (eventId, participantId) => {
  try {
    const response = await authAxios.post(
      `events/${eventId}/participants/add/${participantId}`
    );

    return response.data;
  } catch (error) {
    message.error("Error while adding participant");
    console.error(error);
  }
};
