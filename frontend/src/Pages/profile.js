import { useState, useEffect } from "react";
import ProfileForm from "../Components/profileForm";
import ProfileDetails from "../Components/profileDetails.js";
import EditProfileForm from "../Components/editProfileForm.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

const Profile = () => {
  const { user } = useAuthContext();
  const [showProfileForm, setShowProfileForm] = useState(!user.profileID);
  const [editProfileForm, setEditProfileForm] = useState(false);

  const changeShowEditProfileForm = () => {
    //changes the variable which determines whether to show profile details or edit profile form.
    setEditProfileForm(!editProfileForm);
    console.log(editProfileForm);
  };

  useEffect(() => {
    //useEffect to update showProfileForm when user.profileID changes.
    setShowProfileForm(!user.profileID);
  }, [user.profileID]);

  return (
    <div className="home">
      <div className="profile-form">
        {showProfileForm ? (
          <div className="workout-form">
            <ProfileForm />
          </div>
        ) : editProfileForm ? (
          <div className="workout-form">
            <EditProfileForm
              changeShowEditProfileForm={changeShowEditProfileForm}
            />
          </div>
        ) : (
          <div className="profile-details">
            <ProfileDetails
              changeShowEditProfileForm={changeShowEditProfileForm}
            />
          </div>
        )}
        <p>{editProfileForm}</p>
      </div>
    </div>
  );
};
export default Profile;
