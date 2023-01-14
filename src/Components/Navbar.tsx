import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Button, Container, Header, Segment } from "semantic-ui-react";
import { AppContext } from "../App";

interface Props {
  title: string;
  path: string;
}

const NavbarItem = (props: Props) => {
  //localize actual location and set it to active
  const location = useLocation();
  const isActive = location.pathname === props.path;

  //on click navigate to the Path
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(props.path);
  };

  // hide login and register buttons if logged in
  const { isLIn } = useContext(AppContext);
  if (isLIn && (props.path === "/login" || props.path === "/register"))
    return null;

  return (
    <Menu.Item active={isActive} onClick={handleClick}>
      {props.title}
    </Menu.Item>
  );
};

const Navbar = () => {
  const { isLIn, setIsLIn, setToken } = useContext(AppContext);

  const navigate = useNavigate();

  function handleLogout() {
    setIsLIn(false);
    setToken("");
    navigate("/login");
  }

  return (
    <Segment inverted vertical as="nav" style={{height: "150px"}}>
    <Container as="nav">
      <Header inverted as="h3">
        TODO APP
      </Header>
      <Menu borderless compact inverted>
        <NavbarItem title="Home" path="/" />
        {isLIn && <NavbarItem title="Dashboard" path="/dashboard" />}
        {isLIn && <NavbarItem title="About" path="/about" />}
        {isLIn && (
          <Button inverted onClick={handleLogout} basic>
          Logout
        </Button>
        )}
        <NavbarItem title="Login" path="/login" />
        <NavbarItem title="Register" path="/register" />
      </Menu>
    </Container>
    </Segment>
  );
};

export default Navbar;
