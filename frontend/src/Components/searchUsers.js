import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";

const SearchUsers = ({ changeShowUsers }) => {
  const [currentSearch, setCurrentSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const { user } = useAuthContext();

  if (!user) {
    return;
  }
  const handleListClick = async (profile) => {
    //display rest of profile
    console.log(profile);
    changeShowUsers(profile);

    //we have user
  };
  const handleInputChange = async (e) => {
    const searchItem = e.target.value;
    await setCurrentSearch(searchItem);
    if (searchItem.length > 0) {
      searchDatabaseForUsers(searchItem);
    } else {
      setProfiles([]);
    }

    //go to database and search for all items which start with searchItem. And we put these in a dropdown list.
  };
  const searchDatabaseForUsers = async (searchItem) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/search?term=${encodeURIComponent(
          searchItem
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }

      const currentProfiles = await response.json();
      setProfiles(currentProfiles);
      console.log(currentProfiles);
    } catch (error) {
      console.error("Error searching profiles:", error);
    }
  };

  return (
    <div className="search-profiles">
      <input
        type="text"
        placeholder="search users"
        onChange={handleInputChange}
      />
      <div className="button-spacing"></div>
      <ul>
        {profiles.map((profile) => (
          <li
            key={profile._id}
            onClick={() => handleListClick(profile)}
            className="profileList"
          >
            {profile.username}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SearchUsers;
