import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector((state) => state.user);
  const token = user?.token;
  return { user, token };
};
