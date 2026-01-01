import LogoutIcon from "../../assets/icons/logout.svg";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = () => {
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
