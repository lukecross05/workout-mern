import { useProfileContext } from "../hooks/useProfileContext";
import { useState, useEffect } from "react";

const ProfileDetails = () => {
  const { profile } = useProfileContext();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  useEffect(() => {
    console.log("Profile updated:", profile);
    if (profile) {
      setBio(profile.bio);
      setUsername(profile.username);
    }
  }, [profile]);

  // If profile is not loaded yet, display a loading message

  return (
    <div className="profile-details">
      <pre>{username}</pre>
      <pre>{bio}</pre>
    </div>
  );
};
//<pre>{JSON.stringify(user)}</pre>
export default ProfileDetails;
