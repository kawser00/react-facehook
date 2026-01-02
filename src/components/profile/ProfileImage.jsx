import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { API_BASE_URL } from "../../api";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";

const ProfileImage = () => {
  const { api } = useAxios();
  const { profile } = useProfile();
  const fileUploadRef = useRef(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (formData) =>
      api.post(`/profile/${profile?.user?.id}/avatar`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", profile?.user?.id],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const uploadAndDisplayImage = () => {
    const file = fileUploadRef.current.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("avatar", file);
      mutate(formData);
    }
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener("change", uploadAndDisplayImage);
    fileUploadRef.current.click();
  };

  return (
    <div className="relative mb-8">
      <div className="w-45 h-45 lg:h-54.5 lg:w-54.5 rounded-full bg-white">
        <img
          className="h-full w-full rounded-full object-cover"
          src={`${API_BASE_URL}/${profile?.user?.avatar}`}
          alt={profile?.user?.firstName}
        />
      </div>
      <form id="form" encType="multipart/form-data">
        <button
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          onClick={handleImageUpload}
          type="submit"
        >
          <img src={EditIcon} alt="Edit" />
        </button>
        <input id="file" type="file" ref={fileUploadRef} hidden />
      </form>
    </div>
  );
};

export default ProfileImage;
