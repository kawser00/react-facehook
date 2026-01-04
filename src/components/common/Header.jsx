import { Link } from "react-router";
import HomeIcon from "../../assets/icons/home.svg";
import Notification from "../../assets/icons/notification.svg";
import Logo from "../../assets/images/logo.svg";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import Logout from "../auth/Logout";

const Header = () => {
  const { auth } = useAuth();
  const { profile } = useProfile();

  const user = profile?.user ?? auth?.user;
  console.log(user)

  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/">
          <img className="max-w-25 lg:max-w-35" src={Logo} alt="logo" />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={HomeIcon} alt="Home" />
            Home
          </Link>
          <button className="icon-btn min-w-9">
            <img src={Notification} alt="Notification" />
          </button>

          <Logout />

          <Link to="/me" className="w-full flex-center ml-8! gap-3">
            <span className="text-lg font-medium lg:text-xl">
              {`${user?.firstName} ${user?.lastName}`}
            </span>
            <img
              className="w-full max-h-8 max-w-8 lg:max-h-11 lg:max-w-11 rounded-full object-cover"
              src={`${API_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
