import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
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
                Dropdown Button
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
