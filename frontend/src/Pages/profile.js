import { useState, useEffect } from "react";
import ProfileForm from "../Components/profileForm";
import ProfileDetails from "../Components/profileDetails.js";
import EditProfileForm from "../Components/editProfileForm.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useProfileContext } from "../hooks/useProfileContext";

const Profile = () => {
  //useeffect hook to perform side effects in function components
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const [showProfileForm, setShowProfileForm] = useState(!user.profileID);
  const [editProfileForm, setEditProfileForm] = useState(false);

  const changeShowEditProfileForm = () => {
    setEditProfileForm(!editProfileForm);
    console.log(editProfileForm);
  };
  // useEffect to update showProfileForm when user.profileID changes
  useEffect(() => {
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
//<pre>{JSON.stringify(user, null, 2)}</pre>
export default Profile;
