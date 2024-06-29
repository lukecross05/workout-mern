import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";
import { useProfileContext } from "./useProfileContext";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();
  const { dispatch: profileDispatch } = useProfileContext();
  const logout = () => {
    localStorage.removeItem("user");

    authDispatch({ type: "LOGOUT" });
    profileDispatch({ type: "LOGOUTPROFILE" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};
