import { useState, useEffect } from "react";
import WorkoutsDetailsVeiwMode from "./workoutDetailsVeiwMode";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";

const ViewProfile = ({ profile, changeShowUsers }) => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [picPath, setPath] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const { user } = useAuthContext();
  const { profile: currentProfile } = useProfileContext();
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    console.log("veiwing profile. ", profile);
    if (profile.bPublic) {
      //if profiles public.

      const fetchData = async () => {
        //get the users workouts.
        try {
          const response = await fetch(
            `http://localhost:4000/api/workouts/veiw?term=${encodeURIComponent(
              profile.email
            )}`,
            {
              method: "GET",
            }
          );

          if (!response.ok) {
            console.log("error fetching profile. ");
          }

          const fetchedWorkouts = await response.json(); //take and set workouts.
          await setWorkouts(fetchedWorkouts);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
      setBio(profile.bio); //set other fields.
      setUsername(profile.username);

      if (profile.picFile) {
        //if the user has a profile picture, set the path for it.
        setPath(`http://localhost:4000/public/${profile.picFile}`);
      }
    } else {
      //if not public, show message.
      setUsername("profile is private");
    }
    fetchFriends(); //fetch users friends, to see whether the profile being veiwed has sent you friends request.
  }, [profile]);

  const fetchFriends = async () => {
    //requests a users profile from backend, and takes the friend requests and stores them.
    if (currentProfile && currentProfile.username) {
      const response = await fetch(
        "http://localhost:4000/api/users/profile/friends/" +
          currentProfile.username,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();
      const { friendRequests, friends } = json;
      setFriendRequests(friendRequests);
      setFriends(friends);
    }
  };
  const handleClick = () => {
    changeShowUsers();
  };

  const addFriend = async () => {
    const emailOfRecipient = encodeURIComponent(profile.email);
    const emailOfSender = encodeURIComponent(user.email);

    try {
      //sends a friend request to the profile.
      const response = await fetch(
        `http://localhost:4000/api/users/profile/add/?emailOfRecipient=${emailOfRecipient}&emailOfSender=${emailOfSender}`,

        {
          method: "PATCH",
        }
      );
    } catch (error) {}
  };

  const deleteFromRequests = async (username) => {
    const usernameOfSender = encodeURIComponent(username);
    const emailOfRecipient = encodeURIComponent(user.email);

    try {
      //sends a request to delete a username from a profiles friends list.
      await fetch(
        `http://localhost:4000/api/users/profile/deletefriendrequest/?usernameOfSender=${usernameOfSender}&emailOfRecipient=${emailOfRecipient}`,

        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {}
    fetchFriends(); //updates friends list after.
  };
  const acceptFriend = async () => {
    await deleteFromRequests(profile.username); //deletes friends request.

    const usernameOfSender = encodeURIComponent(profile.username);
    const emailOfRecipient = encodeURIComponent(user.email);
    try {
      await fetch(
        `http://localhost:4000/api/users/profile/acceptfriendrequest?usernameOfSender=${usernameOfSender}&emailOfRecipient=${emailOfRecipient}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {}
    fetchFriends(); //refreshes friends list.
  };

  return (
    <div className="profile-details">
      <img
        src={picPath}
        alt="My Image"
        style={{ width: "50px", height: "50px" }}
      />
      <div className="spacing"></div>
      <p>{username}</p>
      <p>{bio}</p>

      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutsDetailsVeiwMode key={workout._id} workout={workout} />
          ))}
      </div>
      <div>
        <button onClick={handleClick} className="loginButton">
          back
        </button>
        <div className="spacing"></div>
        {friends.includes(profile.username) ? (
          <p>Friends</p>
        ) : friendRequests.includes(profile.username) ? (
          <button onClick={acceptFriend} className="accept">
            Accept
          </button>
        ) : (
          <button onClick={addFriend} className="loginButton">
            Add Friend
          </button>
        )}
      </div>
    </div>
  );
};
//<pre>{JSON.stringify(user)}</pre>
export default ViewProfile;
