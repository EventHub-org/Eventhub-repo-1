import React, {
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import axios from "../api/axios";
import { message } from "antd";

import { refreshToken } from "../jwt/refreshToken";

const LOGIN_URL = "/authentication/login";
const REGISTER_URL = "/authentication/register";
const LOGOUT_URL = "/authentication/logout";
const GOOGLE_AUTH_URL = "/authentication/google";

axios.defaults.withCredentials = true;

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      console.log(`fetch me`);
      try {
        const response = await refreshToken();
        console.log(`response: ${response}`);
        setAccessToken(response);
        console.log(`access token: ${response}`);
      } catch {
        setAccessToken(null);
      }
    };
    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      console.log("Inside request interceptor");
      console.log(`access token: ${accessToken}`);
      config.headers.Authorization =
        !config._retry && accessToken
          ? `Bearer ${accessToken}`
          : config.headers.Authorization;

      console.log(`config headers after request: ${config.headers}`);
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originlRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data === "Bad JWT token"
        ) {
          try {
            console.log("Inside try block");
            console.error(error);
            console.log(`Error headers: ${error.headers}`);
            // remove from header bad token
            //...
            console.log(`Original request before: ${originlRequest}`);

            setAccessToken(null);

            const token = await refreshToken();
            console.log(`Response after try block: ${token}`);
            setAccessToken(token);

            originlRequest.headers.Authorization = `Bearer ${token}`;
            originlRequest._retry = true;

            console.log(`Original request after: ${originlRequest}`);

            return axios(originlRequest);
          } catch (err) {
            console.log("Inside catch block");
            console.error(err);
            message.info("Session time end");
            setAccessToken(null);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      LOGIN_URL,
      {
        email,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const token = res?.data;
    console.log(`access token from login:`);
    setAccessToken(token);
  };

  const register = async (userData) => {
    await axios.post(REGISTER_URL, userData, {
      headers: { "Content-Type": "application/json" },
    });
  };

  const confirmEmail = async (emailToken) => {
    const res = await axios.get(
      `authentication/confirm-account?token=${emailToken}`,

      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const token = res?.data;

    setAccessToken(token);
  };

  const confirmResetPassword = async (data) => {
    const res = await axios.post("/authentication/forgot-password", data, {
      headers: { "Content-Type": "application/json" },
    });

    const token = res?.data;

    setAccessToken(token);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        LOGOUT_URL,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAccessToken(null);

      message.info("You are logged out");

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const googleAuth = async (googleToken) => {
    try {
      const res = await axios.post(
        GOOGLE_AUTH_URL,
        { google_token: googleToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = res?.data?.accessToken;

      if (token) {
        setAccessToken(token);
      }

      return res;
    } catch (err) {
      if (!err.response) {
        // Помилка з'єднання з сервером
        message.error("No server response");
      } else {
        message.error(err.response.data);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        // auth,
        // setAuth,
        accessToken,
        login,
        confirmEmail,
        logout,
        register,
        googleAuth,
        confirmResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
