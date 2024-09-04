import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useLoginProfile } from "./useLoginProfile";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState("");
  const { dispatch } = useAuthContext();
  const { loginP } = useLoginProfile();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    //sends a login request.
    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    const { profileID, token } = json;

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      if (profileID) {
        //use profile hook to call profile context.
        loginP(profileID, token);
      }

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
