import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CheckIcon from "../../assets/icons/check.svg";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";

const Bio = () => {
  const { api } = useAxios();
  const { profile } = useProfile();
  const [bio, setBio] = useState(profile?.user?.bio || "");
  const [editMode, setEditMode] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (bio) => api.patch(`/profile/${profile?.user?.id}`, { bio }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", profile?.user?.id],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleEditClick = () => {
    setEditMode(true);
    setBio(profile?.user?.bio);
  };

  const handleBioEdit = () => {
    mutate(bio);
    setEditMode(false);
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {profile?.user?.bio || "No bio available."}
          </p>
        ) : (
          <textarea
            className='p-2 className="leading-[188%] bg-white text-gray-600 lg:text-lg rounded-md'
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {!editMode ? (
        <button
          className="cursor-pointer flex-center h-7 w-7 rounded-full"
          onClick={handleEditClick}
        >
          <img src={EditIcon} alt="Edit" />
        </button>
      ) : (
        <button
          className="cursor-pointer flex-center h-7 w-7 rounded-full"
          onClick={handleBioEdit}
        >
          <img src={CheckIcon} alt="Check" />
        </button>
      )}
    </div>
  );
};

export default Bio;
