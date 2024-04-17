import axios from "axios";

const accessToken = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Credentials": "true",
};

export default axios.create({
  baseURL: "http://localhost:9090",
  headers: headers,
});
