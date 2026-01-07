import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import { API_BASE_URL } from "../../config";
import { useAxios } from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

const ProfileImage = () => {
  const { api } = useAxios();
  const { profile, setProfile } = useProfile();
  const fileUploadRef = useRef(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (formData) =>
      api.post(`/profile/${profile?.user?.id}/avatar`, formData),
    onSuccess: (response) => {
      setProfile({
        ...profile,
        user: {
          ...profile.user,
          avatar: response?.data?.avatar,
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["profile", profile?.user?.id],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleUploadChange = () => {
    const file = fileUploadRef.current.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("avatar", file); // output: { avatar: file }
      mutate(formData);
    }
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
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
      <button
        className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
        onClick={handleImageUpload}
        type="button"
      >
        <img src={EditIcon} alt="Edit" />
      </button>
      <input
        hidden
        type="file"
        ref={fileUploadRef}
        onChange={handleUploadChange}
      />
    </div>
  );
};

export default ProfileImage;
