import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAvatar } from "../../hooks/useAvatar";
import { useAxios } from "../../hooks/useAxios";
import PostCommentList from "./PostCommentList";

const PostComments = ({ post }) => {
  const { api } = useAxios();
  const { avatarURL } = useAvatar(post);
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState(post?.comments ?? []);
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => api.patch(`/posts/${post.id}/comment`, { comment }),
    onSuccess: (response) => {
      setComments([...(response?.data?.comments ?? [])]);
      setComment("");

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const toggleAction = () => {
    setShowComments(!showComments);
  };

  const addComment = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      mutate();
    }
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComment(e)}
          />
        </div>
      </div>
      {comments?.length > 0 && (
        <>
          <div className="mt-4">
            <button
              onClick={toggleAction}
              className="text-gray-300 max-md:text-sm cursor-pointer"
            >
              All Comment ▾
            </button>
          </div>
          {showComments && <PostCommentList comments={comments} />}
        </>
      )}
    </div>
  );
};

export default PostComments;
