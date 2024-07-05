import axios from "./axios";
export const resedVerificationEmail = async (email) => {
  const response = await axios.get(`/authentication/resend?email=${email}`);
  return response.data;
};
