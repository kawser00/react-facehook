import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import NewPost from "../components/posts/NewPost";
import PostList from "../components/posts/PostList";
import PostEntry from "../components/posts/PostEntry";
import { useAxios } from "../hooks/useAxios";
import { usePosts } from "../hooks/usePosts";

const HomePage = () => {
  const { api } = useAxios();
  const { setPosts } = usePosts();
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async ({ queryKey }) => {
    const response = await api.get(`/${queryKey[0]}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data, setPosts]);

  if (isLoading) {
    return <div>Fetching posts...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">Error fetching posts! {error.message}</div>
    );
  }

  const sortedData = data?.sort(
    (a, b) => new Date(b.createAt) - new Date(a.createAt)
  );

  console.log(data)

  return (
    <div>
      {editingPost ? (
        <PostEntry post={editingPost} onCreate={() => setEditingPost(null)} />
      ) : (
        <NewPost />
      )}
      <PostList posts={sortedData || []} setEditingPost={setEditingPost} />
    </div>
  );
};

export default HomePage;
