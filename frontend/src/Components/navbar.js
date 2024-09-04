import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const [path, setPath] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    //use effect to  set profile picture and friend requests whenever profile changes.
    setPath("");
    setFriendRequests([]);
    console.log(friendRequests);
    fetchFriends();
    console.log(profile);
    if (profile && profile.picFile) {
      console.log("picfile present");
      console.log(profile.picFile);
      setPath(`http://localhost:4000/public/${profile.picFile}`);
      console.log(path);
    } else {
      console.log("picfile not present");
      setPath(`http://localhost:4000/public/def.jpg`);
    }

    //here we need to grab all the friends
  }, [profile]);

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      //timer which checks for new friend requests every ten seconds.
      fetchFriends();
    }, 10000);

    return () => clearInterval(intervalId); //clears the interval to prevent any inteferance.
  });

  const fetchFriends = async () => {
    if (!user) {
      return;
    }
    if (profile && profile.username) {
      //requests a users profile from backend, and takes the friend requests and stores them.
      const response = await fetch(
        "http://localhost:4000/api/users/profile/friends/" + profile.username,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();
      const { friendRequests } = json;
      setFriendRequests(friendRequests);
    }
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

  const addToFriendsList = async (username) => {
    await deleteFromRequests(username); //deletes friends request.

    const usernameOfSender = encodeURIComponent(username);
    const emailOfRecipient = encodeURIComponent(user.email);

    try {
      //request to add a username to friends list.
      const response = await fetch(
        `http://localhost:4000/api/users/profile/acceptfriendrequest?usernameOfSender=${usernameOfSender}&emailOfRecipient=${emailOfRecipient}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {}
  };
  //
  return (
    <header>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className="navbar-title">Workout Buddy</h1>
          </Link>
        </div>
        <nav>
          <div className="navbar-right">
            <div className="inbox">
              <Dropdown className="navbar-dropdown">
                <Dropdown.Toggle>inbox</Dropdown.Toggle>
                <Dropdown.Menu>
                  {user &&
                    profile &&
                    (friendRequests && friendRequests.length === 0 ? (
                      <Dropdown.Item>No new friend requests</Dropdown.Item>
                    ) : (
                      friendRequests &&
                      friendRequests.map((request, index) => (
                        <Dropdown.Item key={index}>
                          {request} sent you a friend request
                          <div>
                            <div className="spacing-noti"></div>
                            <button
                              className="noti-button"
                              onClick={() => addToFriendsList(request)}
                            >
                              accept
                            </button>
                            <div className="spacing-noti"></div>
                            <button
                              className="noti-button"
                              onClick={() => deleteFromRequests(request)}
                            >
                              delete
                            </button>
                          </div>
                        </Dropdown.Item>
                      ))
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Dropdown className="navbar-dropdown">
              <Dropdown.Toggle
                as="div"
                className="dropdown-toggle-image"
                id="dropdown-basic"
              >
                <img
                  src={path}
                  alt="My Image"
                  style={{ width: "50px", height: "50px" }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {user ? (
                  <>
                    <Dropdown.Item as="span" className="email">
                      {user.email}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/workouts">
                      Your Workouts
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/users/profile">
                      Your Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/social">
                      Social
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={handleClick}>
                      Logout
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/login">
                      Login
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/signup">
                      Signup
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
