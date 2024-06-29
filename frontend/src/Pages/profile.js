import { useState, useEffect } from "react";
import ProfileForm from "../Components/profileForm";
import ProfileDetails from "../Components/profileDetails.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useProfileContext } from "../hooks/useProfileContext";

const Profile = () => {
  //useeffect hook to perform side effects in function components
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const [showProfileForm, setShowProfileForm] = useState(!user.profileID);

  // useEffect to update showProfileForm when user.profileID changes
  useEffect(() => {
    setShowProfileForm(!user.profileID);
  }, [user.profileID]);
  return (
    <div className="profile">
      <div className="profile-form">
        {showProfileForm ? <ProfileForm /> : <ProfileDetails />}
      </div>
    </div>
  );
};
//<pre>{JSON.stringify(user, null, 2)}</pre>
export default Profile;
