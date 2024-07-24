import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";

const EditProfileForm = ({ changeShowEditProfileForm }) => {
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [bPublic, setBPublic] = useState(false);
  const [pic, setPic] = useState();
  const [picFile, setPicFile] = useState();
  const [picFileType, setPicFileType] = useState();
  const { user, dispatch } = useAuthContext();
  const { profile, dispatch: profileDispatch } = useProfileContext();

  const handleClick = () => {
    changeShowEditProfileForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("you must be logged in");
      return;
    }

    const formData = new FormData();

    formData.append("bio", bio);
    formData.append("bPublic", bPublic);
    if (picFile) {
      formData.append("picFile", picFile);
      formData.append("picFileType", picFileType);
    }
    formData.append("email", user.email);
    /*for (var pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }*/

    const response = await fetch(
      "http://localhost:4000/api/users/profile/" + profile.username,
      {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    console.log(json);
    const { newUsername, newBio, newPicPath } = json;

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
      setBio("");
      setError(null);
      setEmptyFields([]);
      console.log("profile updated");
      console.log(json);
      localStorage.setItem("profile", JSON.stringify(profileDetails));
      await profileDispatch({ type: "LOGINPROFILE", payload: profileDetails });
      changeShowEditProfileForm();
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
    <div>
      <form
        className="create"
        action="http://localhost:4000/api/users/profile"
        onSubmit={handleSubmit}
      >
        <h3>Edit Your Profile</h3>
        <div className="input-container">
          <input
            type="text"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Enter Bio"
            //className={emptyFields.includes("bio") ? "error" : ""}
          />
          <input
            type="file"
            accept="image/png, image/jpeg"
            placeholder="Upload Profile Picture"
            onChange={handlePic}
          />
        </div>
        <button onClick={handleButton}>{bPublic ? "Public" : "Private"}</button>
        <div className="button-spacing"></div>
        <button className="submitButton"> Submit </button>
        <div className="button-spacing"></div>
        {error && <div className="error">{error}</div>}
        <button onClick={handleClick} className="submitButton">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
