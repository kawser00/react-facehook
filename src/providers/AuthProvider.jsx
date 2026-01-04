import Cookies from "js-cookie";
import { useState } from "react";
import {
  FACEHOOK_USER_REFRESH_TOKEN,
  FACEHOOK_USER_SESSION_TOKEN,
  FACEHOOK_USER_INFO,
} from "../config";
import { AuthContext } from "../context";
import { decode } from "../helpers";

const AuthProvider = ({ children }) => {
  const sessionTokenString = Cookies.get(FACEHOOK_USER_SESSION_TOKEN);
  const refreshTokenString = Cookies.get(FACEHOOK_USER_REFRESH_TOKEN);
  const userInfoString = Cookies.get(FACEHOOK_USER_INFO);

  const [auth, setAuth] = useState({
    user: userInfoString ? JSON.parse(userInfoString) : null,
    authToken: sessionTokenString ? decode(sessionTokenString) : null,
    refreshToken: refreshTokenString ? decode(refreshTokenString) : null,
  });

  console.log(auth)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
