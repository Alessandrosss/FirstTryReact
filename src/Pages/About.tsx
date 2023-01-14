import React, { useContext } from "react";
import {
  Button,
  Menu,
  Segment,
  Container,
  Header,
  Placeholder,
  Table,
} from "semantic-ui-react";
import { AppContext } from "../App";

const About = () => {
  const { token, user } = useContext(AppContext);
  return (
    <Segment inverted vertical textAlign="center" as="body">
      <Container className="content">
        <Table celled inverted selectable>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Token</Table.Cell>
              <Table.Cell>{token}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Email adress</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
      <Segment inverted vertical as="footer">
        Cover template for <a href="http://semantic-ui.com">Semantic-UI</a>, by{" "}
        <a href="https://github.com/semantic-ui-forest">@Semantic-UI-Forest</a>.
      </Segment>
    </Segment>
  );
};

export default About;
