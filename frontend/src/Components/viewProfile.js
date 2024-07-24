import { useState, useEffect } from "react";

const ViewProfile = ({ profile, changeShowUsers }) => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [picPath, setPath] = useState("");

  useEffect(() => {
    console.log("veiwing profile:", profile.bPublic);
    if (profile.bPublic) {
      setBio(profile.bio);
      setUsername(profile.username);
      if (profile.picFile) {
        setPath(`http://localhost:4000/public/${profile.picFile}`);
      }
    } else {
      setUsername("profile is private");
    }
  }, [profile]);

  const handleClick = () => {
    changeShowUsers();
  };

  return (
    <div className="profile-details">
      <img
        src={picPath}
        alt="My Image"
        style={{ width: "50px", height: "50px" }}
      />

      <p>{username}</p>
      <p>{bio}</p>
      <button onClick={handleClick} className="loginButton">
        back
      </button>
    </div>
  );
};
//<pre>{JSON.stringify(user)}</pre>
export default ViewProfile;
