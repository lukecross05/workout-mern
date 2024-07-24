import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";

const ProfileForm = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [bPublic, setBPublic] = useState(false);
  const [pic, setPic] = useState();
  const [picFile, setPicFile] = useState();
  const [picFileType, setPicFileType] = useState();
  const { user, dispatch } = useAuthContext();
  const { dispatch: profileDispatch } = useProfileContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("you must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("bPublic", bPublic);
    if (picFile) {
      formData.append("picFile", picFile);
      formData.append("picFileType", picFileType);
    }

    const profile = { username, bio, bPublic, picFileType, picFile };

    const response = await fetch("http://localhost:4000/api/users/profile", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    const {
      newEmail,
      newToken,
      newProfileID,
      newUsername,
      newBio,
      newPicPath,
    } = json;
    const userDetails = {
      email: newEmail,
      token: newToken,
      profileID: newProfileID,
    };
    const profileDetails = {
      username: newUsername,
      bio: newBio,
      picFile: newPicPath,
    };
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setUsername("");
      setBio("");
      setError(null);
      setEmptyFields([]);
      console.log("new profile added");
      console.log(json);
      localStorage.setItem("user", JSON.stringify(userDetails));
      localStorage.setItem("profile", JSON.stringify(profileDetails));
      await profileDispatch({ type: "LOGINPROFILE", payload: profileDetails });
      await dispatch({ type: "LOGIN", payload: userDetails });

      //dp loginProfile
      //context
    }
  };
  const handleButton = (e) => {
    e.preventDefault();
    if (bPublic === true) {
      setBPublic(false);
    } else {
      setBPublic(true);
    }
  };
  const handlePic = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setPic(URL.createObjectURL(file));
    setPicFile(file);
    const fileTypeParts = file.type.split("/");
    const fileExtension = fileTypeParts[fileTypeParts.length - 1];
    setPicFileType(fileExtension);
  };
  return (
    <form
      className="create"
      action="http://localhost:4000/api/users/profile"
      onSubmit={handleSubmit}
    >
      <h3>Create Your Profile</h3>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          //className={emptyFields.includes("username") ? "error" : ""}
        />

        <input
          type="text"
          placeholder="Enter Bio"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          //className={emptyFields.includes("bio") ? "error" : ""}
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handlePic}
          placeholder="Upload Profile Picture"
        />
      </div>
      <img src={pic} />
      <button onClick={handleButton}>{bPublic ? "Public" : "Private"}</button>
      <div className="button-spacing"></div>
      <button className="submitButton"> Submit </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProfileForm;
