import { useProfileContext } from "../hooks/useProfileContext";
import { useState, useEffect } from "react";

const ProfileDetails = ({ changeShowEditProfileForm }) => {
  const { profile } = useProfileContext();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    console.log("profile updated. ", profile);
    if (profile) {
      //when profile changes, update fields.
      setBio(profile.bio);
      setUsername(profile.username);
    }
  }, [profile]);

  const handleClick = () => {
    //change from viewing profiles details to viewing the form to edit them.
    changeShowEditProfileForm();
  };

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
