import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

const PostCard = ({ post, setEditingPost }) => {
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post} setEditingPost={setEditingPost} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostActions post={post} commentCount={post?.comments?.length} />
      <PostComments post={post} />
    </article>
  );
};

export default PostCard;
