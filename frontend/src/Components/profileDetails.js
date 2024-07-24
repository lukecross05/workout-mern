import { useProfileContext } from "../hooks/useProfileContext";
import { useState, useEffect } from "react";

const ProfileDetails = ({ changeShowEditProfileForm }) => {
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
  const handleClick = () => {
    changeShowEditProfileForm();
  };
  // If profile is not loaded yet, display a loading message

  return (
    <div className="profile-details">
      <h3>{username}</h3>
      <p>{bio}</p>
      <button onClick={handleClick} className="edit-profile-button">
        Edit
      </button>
    </div>
  );
};
//<pre>{JSON.stringify(user)}</pre>
export default ProfileDetails;
