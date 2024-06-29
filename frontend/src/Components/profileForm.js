import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";

const ProfileForm = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [bPublic, setBPublic] = useState("public");
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
    if (bPublic === "public") {
      setBPublic("private");
    } else {
      setBPublic("public");
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
      <h3>Create your profile</h3>
      <label className="formText">username</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        //className={emptyFields.includes("username") ? "error" : ""}
      />

      <label className="formText">Bio</label>
      <input
        type="text"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        //className={emptyFields.includes("bio") ? "error" : ""}
      />
      <label>Upload Image</label>
      <input type="file" accept="image/png, image/jpeg" onChange={handlePic} />
      <img src={pic} />
      <label className="formText">Profile Type</label>
      <button onClick={handleButton}>Toggle Public</button>
      <label>{bPublic}</label>
      <p>This means other users will be able to veiw your workouts</p>
      <button className="submitButton"> Submit </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProfileForm;
