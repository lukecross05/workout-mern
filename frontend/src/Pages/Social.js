import { useState, useEffect } from "react";
import SearchUsers from "../Components/searchUsers.js";
import ViewProfile from "../Components/viewProfile.js";

const Social = () => {
  //useeffect hook to perform side effects in function components
  const [showSearchUsers, setSearchUsers] = useState(true);
  const [targetProfile, setTargetProfile] = useState("");

  // useEffect to update showProfileForm when user.profileID changes
  const changeShowUsers = async (profile) => {
    if (profile) {
      setTargetProfile(profile);
    }
    setSearchUsers(!showSearchUsers);
    console.log("users haha");
  };

  return (
    <div className="profile">
      <div className="search-profiles">
        {showSearchUsers ? (
          <SearchUsers changeShowUsers={changeShowUsers} />
        ) : (
          <ViewProfile
            profile={targetProfile}
            changeShowUsers={changeShowUsers}
          /> //make it show the user, we need otherProfileDetails.
        )}
      </div>
    </div>
  );
};
//<pre>{JSON.stringify(user, null, 2)}</pre>
export default Social;
