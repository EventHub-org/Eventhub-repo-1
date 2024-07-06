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
        setAccessToken(response);
      } catch {
        setAccessToken(null);
      }
    };
    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      console.log("Inside request interceptor");
      config.headers.Authorization =
        !config._retry && accessToken
          ? `Bearer ${accessToken}`
          : config.headers.Authorization;

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
            console.log("Inside response try block");

            const token = await refreshToken();

            setAccessToken(token);

            originlRequest.headers.Authorization = `Bearer ${token}`;
            originlRequest._retry = true;

            return axios(originlRequest);
          } catch (err) {
            console.log("Inside response catch block");
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
