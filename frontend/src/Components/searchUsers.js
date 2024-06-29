import { useProfileContext } from "../hooks/useProfileContext";
import { useState, useEffect } from "react";

const SearchUsers = () => {
  const { profile } = useProfileContext();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  return (
    <div className="profile-details">
      <p>search users</p>
    </div>
  );
};
export default SearchUsers;
