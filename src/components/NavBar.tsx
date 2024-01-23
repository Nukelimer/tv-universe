import { Link, useNavigate } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";
const styles = {
  padding: "0.2em 2em 0.2em 2em",
};


const NavBar = () => {
  const navigate = useNavigate();
  
  const isLoggedIn = localStorage.getItem("guest_session_id") !== null;
  const logoutHandler = () => {
    localStorage.removeItem("guest_session_id");
    navigate("/authentication");
  };

  return (
    <Menu fixed="top" size="massive" style={styles}>
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/ratings">
        Ratings
      </Menu.Item>

      <Menu.Menu position="right">
        {isLoggedIn ? (
          <Menu.Item as={Button} onClick={logoutHandler}>
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item as={Link} to="/authentication">
            USER
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
