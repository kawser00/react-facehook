import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import { API_BASE_URL } from "../../config";
import { useAxios } from "../../hooks/useAxios";
import { usePosts } from "../../hooks/usePosts";
import { useUserInfo } from "../../hooks/useUserInfo";
import Field from "../common/Field";

const PostEntry = ({ onCreate }) => {
  const { posts, setPosts } = usePosts();
  const queryClient = useQueryClient();
  const { user } = useUserInfo();
  const { api } = useAxios();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => api.post("/posts", formData),
    onSuccess: (response) => {
      setPosts([...posts, response?.data]);

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onCreate();
    },
    onError: (err) => {
      console.error(err);

      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${err.message}`,
      });
    },
  });

  const handlePostSubmit = (data) => {
    const formData = new FormData();
    const avatar = data.photo[0];

    if (avatar) {
      formData.append("image", avatar);
      formData.append("content", data.content);
    } else {
      formData.append("content", data.content);
    }
    
    mutate(formData);
  };

  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-14.5 lg:max-w-14.5"
              src={`${API_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}{" "}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer text-gray-100!"
            htmlFor="photo"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input
            hidden
            type="file"
            name="photo"
            id="photo"
            {...register("photo")}
          />
        </div>
        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-30 w-full bg-transparent focus:outline-none lg:h-40"
          ></textarea>
        </Field>
        {errors?.root?.random && (
          <p className="text-red-500 pb-2">{errors?.root?.random?.message}</p>
        )}
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEntry;
