import axios from "./axios";
import { getUserIdFromToken } from "./getUserIdFromToken";

export const getUserEvents = async () => {
  const user_id = await getUserIdFromToken();

  const DATA_URL = `/users/${user_id}/events`;

  const response = await axios.get(DATA_URL);
  return response.data;
};
