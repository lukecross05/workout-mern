import { useState, useEffect } from "react";
import SearchUsers from "../Components/searchUsers.js";
import ViewProfile from "../Components/viewProfile.js";

const Social = () => {
  const [showSearchUsers, setSearchUsers] = useState(true);
  const [targetProfile, setTargetProfile] = useState("");

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
          />
        )}
      </div>
    </div>
  );
};
//<pre>{JSON.stringify(user, null, 2)}</pre>
export default Social;
