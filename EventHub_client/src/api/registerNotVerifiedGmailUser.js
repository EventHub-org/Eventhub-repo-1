import axios from "./axios";

export const registerNotVerifiedGmailUser = async (googleToken, username) => {
  const response = await axios.post(
    `/authentication/not-verified-gmail-register`,
    {
      googleToken,
      username,
    }
  );
  return response.data;
};
