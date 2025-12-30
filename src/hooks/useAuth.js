import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context";

const useAuth = () => {
  const context = useContext(AuthContext);
  const { auth } = context || {};

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

  return context;
};

export default useAuth;
