import { useState } from "react";
import { useProfileContext } from "./useProfileContext";

export const useLoginProfile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState("");
  const [imagePath, setImagePath] = useState();
  const { dispatch } = useProfileContext();

  const loginP = async (profileID, token) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      "http://localhost:4000/api/users/profile/" + profileID,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //profile
      localStorage.setItem("profile", JSON.stringify(json));
      dispatch({ type: "LOGINPROFILE", payload: json });
      //here dispatch profile login essentialy
      setIsLoading(false);
    }
  };
  return { loginP, isLoading, error };
};
