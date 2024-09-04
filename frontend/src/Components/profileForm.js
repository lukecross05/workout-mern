import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";

const ProfileForm = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
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

    formData.append("username", username); //adds all fields from the form to the formdata.
    formData.append("bio", bio);
    formData.append("bPublic", bPublic);
    if (picFile) {
      formData.append("picFile", picFile);
      formData.append("picFileType", picFileType);
    }

    const response = await fetch("http://localhost:4000/api/users/profile", {
      //sends a post request to create the profile in the backend.
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      const {
        //take needed fields from the response.
        newEmail,
        newToken,
        newProfileID,
        newUsername,
        newBio,
        newPicPath,
        friendRequests,
      } = json;

      const userDetails = {
        //split them into user parts and profile parts.
        email: newEmail,
        token: newToken,
        profileID: newProfileID,
      };

      const profileDetails = {
        username: newUsername,
        bio: newBio,
        picFile: newPicPath,
        friendRequests: friendRequests,
      };

      setUsername(""); //reset fields.
      setBio("");
      setError(null);

      localStorage.setItem("user", JSON.stringify(userDetails)); //save updated profile and user to local storage.
      localStorage.setItem("profile", JSON.stringify(profileDetails));
      await profileDispatch({ type: "LOGINPROFILE", payload: profileDetails }); //dispatch a login for profile and user to update their context.
      await dispatch({ type: "LOGIN", payload: userDetails });
    }
  };

  const handleButton = (e) => {
    //toggles the value of bPublic.
    e.preventDefault();
    if (bPublic === true) {
      setBPublic(false);
    } else {
      setBPublic(true);
    }
  };

  const handlePic = (e) => {
    //handles picture upload.
    e.preventDefault();
    const file = e.target.files[0];

    setPic(URL.createObjectURL(file)); //creates and stores a url reference to the photo to display a preview.
    setPicFile(file);

    const fileTypeParts = file.type.split("/"); //splits file into peices.

    const fileExtension = fileTypeParts[fileTypeParts.length - 1]; //takes the file extension from the array.

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
      <div className="button-spacing"></div>
      <button onClick={handleButton}>{bPublic ? "Public" : "Private"}</button>
      <div className="button-spacing"></div>
      <button className="submitButton"> Submit </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProfileForm;
