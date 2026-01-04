import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import LogoutIcon from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks/useAuth";
import {
  FACEHOOK_USER_SESSION_TOKEN,
  FACEHOOK_USER_REFRESH_TOKEN,
  FACEHOOK_USER_INFO,
} from "../../config";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = () => {
    Cookies.remove(FACEHOOK_USER_SESSION_TOKEN);
    Cookies.remove(FACEHOOK_USER_REFRESH_TOKEN);
    Cookies.remove(FACEHOOK_USER_INFO);
    setAuth(null);
    navigate("/login");
  };

  return (
    <button className="icon-btn min-w-9" onClick={handleLogout}>
      <img src={LogoutIcon} alt="Logout" />
    </button>
  );
};

export default Logout;
