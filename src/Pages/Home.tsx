import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Menu,
  Segment,
  Container,
  Header,
  Placeholder,
} from "semantic-ui-react";
import { AppContext } from "../App";

const Home = () => {
  const { token } = useContext(AppContext);
  return (
    <Segment inverted vertical textAlign="center">
      <Container className="content">
        <Header inverted as="h1">
          Wellcome
        </Header>
        {!token && (
          <p>
            <Link to="/register"> Sign in</Link> and try out the app!
          </p>
        )}
      </Container>
      <Segment inverted vertical as="footer">
        Cover template for <a href="http://semantic-ui.com">Semantic-UI</a>, by{" "}
        <a href="https://github.com/semantic-ui-forest">@Semantic-UI-Forest</a>.
      </Segment>
    </Segment>
  );
};

export default Home;
