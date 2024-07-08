import axios from "./axios";

export const getIsGmailVerified = async (googleToken) => {
  const response = await axios.get(
    `/authentication/${googleToken}/is-gmail-verified`
  );
  return response.data;
};
