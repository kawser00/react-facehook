import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const ProfilePage = () => {
  const { api } = useAxios();
  const { auth } = useAuth();

  const fetchProfileData = async ({ queryKey }) => {
    const response = await api.get(`/${queryKey[0]}/${queryKey[1]}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["profile", auth?.user?.id],
    queryFn: fetchProfileData,
  });

  if (isLoading) {
    return <div> Fetching your Profile data...</div>;
  }

  if (error) {
    return <div className="text-red-500"> {error.message}</div>;
  }

  return (
    <div>
      Welcome, {data?.user?.firstName} {data?.user?.lastName}
      <p>You have {data?.posts?.length} posts.</p>
    </div>
  );
};

export default ProfilePage;
