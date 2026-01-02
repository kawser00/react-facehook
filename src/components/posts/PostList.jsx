import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p>No posts found</p>
      )}
    </>
  );
};

export default PostList;
