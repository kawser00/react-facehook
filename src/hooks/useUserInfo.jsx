import { useAuth } from "./useAuth";
import { useProfile } from "./useProfile";

export const useUserInfo = () => {
  const { auth } = useAuth();
  const { profile } = useProfile();

  const user = profile?.user ?? auth?.user;

  return { user };
};
