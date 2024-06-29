import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useLoginProfile } from "./useLoginProfile";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState("");
  const [profileID, setProfileID] = useState();
  const { dispatch } = useAuthContext();
  const { loginP } = useLoginProfile();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    //get profile ID and call profile hook
    const { profileID, token } = json;
    console.log(profileID);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      if (profileID) {
        //use login profile hook
        loginP(profileID, token);
      }
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      //here dispatch profile login essentialy
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
