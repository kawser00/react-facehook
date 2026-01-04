import { API_BASE_URL } from "../config";
import { useProfile } from "./useProfile";

export const useAvatar = (post) => {
  const { profile } = useProfile();

  const isMe = profile?.user?.id === post?.author?.id;
  const avatar = isMe ? profile?.user?.avatar : post?.author?.avatar;

  const avatarURL = `${API_BASE_URL}/${avatar}`;

  return { avatarURL };
};
