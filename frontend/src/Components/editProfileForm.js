import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";

const EditProfileForm = ({ changeShowEditProfileForm }) => {
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [bPublic, setBPublic] = useState(false);
  const [picFile, setPicFile] = useState();
  const [picFileType, setPicFileType] = useState();
  const { user } = useAuthContext();
  const { profile, dispatch: profileDispatch } = useProfileContext();

  const handleClick = () => {
    //changes the page to display the profile details again, if a user cancels.
    changeShowEditProfileForm();
  };

  const handleSubmit = async (e) => {
    //handles submission of edit profile form.
    e.preventDefault();

    const formData = new FormData(); //creates a form data variable.

    formData.append("bio", bio); //adds all fields from the form to the formdata.
    formData.append("bPublic", bPublic);
    if (picFile) {
      formData.append("picFile", picFile);
      formData.append("picFileType", picFileType);
    }
    formData.append("email", user.email);

    const response = await fetch(
      //sends a patch request to update the profile in the backend.
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

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      const { newUsername, newBio, newPicPath } = json; //gets the updated fields from the response.

      const profileDetails = {
        //groups all changed fields for dispatch.
        username: newUsername,
        bio: newBio,
        picFile: newPicPath,
      };

      setBio(""); //reset fields.
      setError(null);

      console.log("profile updated");
      console.log(json);

      localStorage.setItem("profile", JSON.stringify(profileDetails)); //stores updated profile in local storage.
      await profileDispatch({ type: "LOGINPROFILE", payload: profileDetails }); //dispatch to update profile context.

      changeShowEditProfileForm();
    }
  };

  const handleButton = (e) => {
    //handles toggle public/private button.
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
    setPicFile(file);

    const fileTypeParts = file.type.split("/"); //splits file into peices.

    const fileExtension = fileTypeParts[fileTypeParts.length - 1]; //takes the file extension from the array.

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
