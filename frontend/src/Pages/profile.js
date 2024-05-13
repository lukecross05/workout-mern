import ProfileForm from "../Components/profileForm";
import ProfileDetails from "../Components/profileDetails.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

const Profile = () => {
  //useeffect hook to perform side effects in function components
  const { user } = useAuthContext();

  return (
    <div className="profile">
      <div className="profile-form">
        {user.profileID ? <ProfileDetails /> : <ProfileForm />}
      </div>
    </div>
  );
};
//<pre>{JSON.stringify(user, null, 2)}</pre>
export default Profile;
