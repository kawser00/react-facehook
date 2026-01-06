import { useQuery } from "@tanstack/react-query";
import NewPost from "../components/posts/NewPost";
import PostList from "../components/posts/PostList";
import { useAxios } from "../hooks/useAxios";

const HomePage = () => {
  const { api } = useAxios();

  const fetchPosts = async ({ queryKey }) => {
    const response = await api.get(`/${queryKey[0]}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <div>Fetching posts...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">Error fetching posts! {error.message}</div>
    );
  }

  return (
    <div>
      <NewPost />
      <PostList posts={data || []} />
    </div>
  );
};

export default HomePage;
