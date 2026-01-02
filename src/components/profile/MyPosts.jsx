import PostList from "../posts/PostList";
import useProfile from "../../hooks/useProfile";

const MyPosts = () => {
  const { profile } = useProfile();
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <PostList posts={profile?.posts} />
    </>
  );
};

export default MyPosts;
