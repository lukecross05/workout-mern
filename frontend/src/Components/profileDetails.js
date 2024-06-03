import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";

import { useEffect, useState } from "react";

const ProfileDetails = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  /*useEffect(() => {
    //define an asynchronous function to fetch data
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/profile/" + user.profileID,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format: Expected JSON");
        }
        const json = await response.json();
        const { username, bio } = json;
        setUsername(username);
        setBio(bio);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (user) {
      fetchData();
    }
  }, [dispatch, user]);*/

  return (
    <div className="workout-details">
      <pre>{JSON.stringify(profile.username)}</pre>
      <pre>{JSON.stringify(profile.bio)}</pre>
    </div>
  );
};
//<pre>{JSON.stringify(user)}</pre>
export default ProfileDetails;
