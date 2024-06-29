import { createContext, useReducer, useEffect } from "react";

export const ProfileContext = createContext();

export const profileReducer = (state, action) => {
  switch (action.type) {
    case "LOGINPROFILE":
      console.log("login p ran");
      return { profile: action.payload };

    case "LOGOUTPROFILE":
      console.log("lgp ran");
      localStorage.removeItem("profile");
      return { profile: null };
    default:
      return state;
  }
};
export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, {
    profile: null,
  });
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      dispatch({ type: "LOGINPROFILE", payload: profile });
    }
  }, []);
  console.log("ProfileContext state: ", state);

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
