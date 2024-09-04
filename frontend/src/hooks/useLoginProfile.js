import { useState } from "react";
import { useProfileContext } from "./useProfileContext";

export const useLoginProfile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState("");
  const { dispatch } = useProfileContext();

  const loginP = async (profileID, token) => {
    setIsLoading(true);
    setError(null);
    //send a get request to grab profile.
    const response = await fetch(
      "http://localhost:4000/api/users/profile/" + profileID,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("profile", JSON.stringify(json)); //set profile in local storage and dispatch for context.
      dispatch({ type: "LOGINPROFILE", payload: json });
      setIsLoading(false);
    }
  };
  return { loginP, isLoading, error };
};
