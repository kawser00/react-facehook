import { useState } from "react";
import { useAvatar } from "../../hooks/useAvatar";
import PostCommentList from "./PostCommentList";

const PostComments = ({ post }) => {
  const { avatarURL } = useAvatar(post);
  const [showComments, setShowComments] = useState(true);

  const toggleAction = () => {
    setShowComments(!showComments);
  };

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-8.5 lg:max-w-8.5"
          src={avatarURL}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighter-dark px-4 text-xs focus:outline-none sm:h-9.5"
            name="post"
            id="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      {post?.comments?.length > 0 && (
        <>
          <div className="mt-4">
            <button
              onClick={toggleAction}
              className="text-gray-300 max-md:text-sm cursor-pointer"
            >
              All Comment ▾
            </button>
          </div>
          {showComments && <PostCommentList comments={post?.comments} />}
        </>
      )}
    </div>
  );
};

export default PostComments;
