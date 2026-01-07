import PostCard from "./PostCard";

const PostList = ({ posts, setEditingPost }) => {
  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} setEditingPost={setEditingPost} />)
      ) : (
        <p>No posts found</p>
      )}
    </>
  );
};

export default PostList;
