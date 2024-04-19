import { message } from "antd";
import authAxios from "./authAxios";

export const getParticipantByUser = async (eventId) => {
  try {
    const response = await authAxios.get(`events/${eventId}/participants/user`);
    return response.data;
  } catch (error) {
    message.error("Error getting participant by user id");
    console.error(error);
  }
};
