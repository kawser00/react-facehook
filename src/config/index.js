import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
export const FACEHOOK_USER_SESSION_TOKEN = "__facehook_user_session_token";
export const FACEHOOK_USER_REFRESH_TOKEN = "__facehook_user_refresh_token";
export const FACEHOOK_USER_INFO = "__facehook_user_info";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
