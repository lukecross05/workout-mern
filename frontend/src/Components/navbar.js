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
  //const path = "..../backend/public/" + profile.picFile;
  useEffect(() => {
    setPath("");
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
  }, [profile]);

  const handleClick = () => {
    logout();
  };
  //
  return (
    <header>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/">
            <h1>Workout Buddy</h1>
          </Link>
        </div>
        <nav>
          <div className="navbar-right">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
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
                    <Dropdown.Item as="button" onClick={handleClick}>
                      Logout
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/users/profile">
                      Your Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/social">
                      Social
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
