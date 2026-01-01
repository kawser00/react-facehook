import { useState } from "react";
import { ProfileContext } from "../context";

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    user: null,
    posts: [],
  });

  console.log(profile);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
