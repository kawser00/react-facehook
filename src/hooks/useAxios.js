import axios from "axios";
import { useEffect } from "react";
import {
  api,
  API_BASE_URL,
  FACEHOOK_USER_SESSION_TOKEN,
  FACEHOOK_USER_REFRESH_TOKEN,
} from "../config";
import { useAuth } from "./useAuth";
import Cookies from "js-cookie";

export const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${API_BASE_URL}/auth/refresh-token`,
              {
                refreshToken,
              }
            );
            const { token } = response.data;

            console.log(`New Token: ${token}`);
            setAuth({ ...auth, authToken: token });

             Cookies.set(FACEHOOK_USER_SESSION_TOKEN, token);
             Cookies.set(FACEHOOK_USER_REFRESH_TOKEN, refreshToken);

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (err) {
            setAuth(null);
            Cookies.remove(FACEHOOK_USER_SESSION_TOKEN);
            Cookies.remove(FACEHOOK_USER_REFRESH_TOKEN);
            setAuth(null);
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);

  return { api };
};
