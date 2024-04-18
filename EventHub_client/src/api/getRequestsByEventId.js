import { message } from "antd";
import authAxios from "./authAxios";

export const getRequestsByEventId = async (eventId) => {
  try {
    const response = await authAxios.get(
      `events/${eventId}/participants/requests`
    );
    return response.data;
  } catch (error) {
    message.error("Error getting requests by event id");
    console.error(error);
  }
};
