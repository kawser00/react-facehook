import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import MyPosts from "../components/profile/MyPosts";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";

const ProfilePage = () => {
  const { api } = useAxios();
  const { auth } = useAuth();
  const { setProfile } = useProfile();

  const fetchProfileData = async ({ queryKey }) => {
    const response = await api.get(`/${queryKey[0]}/${queryKey[1]}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["profile", auth?.user?.id],
    queryFn: fetchProfileData,
  });

  useEffect(() => {
    if (data) {
      setProfile({
        user: data.user,
        posts: data.posts,
      });
    }
  }, [data, setProfile]);

  if (isLoading) {
    return <div>Fetching your Profile data...</div>;
  }

  if (error) {
    return <div className="text-red-500"> {error.message}</div>;
  }

  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
};

export default ProfilePage;
