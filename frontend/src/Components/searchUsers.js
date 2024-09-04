import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const SearchUsers = ({ changeShowUsers }) => {
  const [profiles, setProfiles] = useState([]);
  const { user } = useAuthContext();

  if (!user) {
    return;
  }

  const handleListClick = async (profile) => {
    //if a user presses on a profile they search for, pass the profile to the parent component to pass to the veiwprofile component.
    changeShowUsers(profile);
  };

  const handleInputChange = async (e) => {
    const searchItem = e.target.value;

    if (searchItem.length > 0) {
      //checks whether search terms is populated.
      searchDatabaseForUsers(searchItem);
    } else {
      setProfiles([]);
    }
  };

  const searchDatabaseForUsers = async (searchItem) => {
    try {
      //sends a request to return all profiles which usernames match the search term.
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
        console.log("error fetching profiles. ");
      }

      const currentProfiles = await response.json();
      setProfiles(currentProfiles);
    } catch (error) {
      console.error("error searching profiles. ", error);
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
