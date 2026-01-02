import { API_BASE_URL } from "../../api";

const PostCommentList = ({ comments }) => {
  return (
    <div className="space-y-4 divide-y divide-lighter-dark pl-2 pt-4 lg:pl-3">
      {comments &&
        comments.map((comment) => (
          <div className="flex items-center gap-3 pb-4" key={comment.id}>
            <img
              className="max-w-6 max-h-6 rounded-full"
              src={`${API_BASE_URL}/${comment?.author?.avatar}`}
              alt="avatar"
            />
            <div>
              <div className="flex gap-1 text-xs lg:text-sm">
                <span>{comment?.author?.name}: </span>
                <span>{comment.comment}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostCommentList;
