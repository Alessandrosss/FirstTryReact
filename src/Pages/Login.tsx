import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Header,
  Form,
  Button,
  FormField,
  Message,
  Grid,
  Segment,
} from "semantic-ui-react";

import { auth } from "../lib/auth";
import { AppContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {isLIn, setUser, setToken, setIsLIn, errors, setErrors } =
    useContext(AppContext);

    /* CHECK IF USER IS LOGGED IN */
  if (isLIn) return navigate("/dashboard");

/* HANDLE CHANGE */
  const handleChange = (event, props) => {
    const { name, value } = props;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

/* HANDLE LOGIN BUTTON */
  const handleClick = () => {
    auth
      .login(email, password)
      .then((res) => {
        if(res.message) setErrors(res.message);
        if (res.data) {
          setToken(res.data.token);
          setUser(res.data.user);
          setIsLIn(res.success);
          setErrors("")
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Segment inverted vertical textAlign="center">
      <Grid textAlign="center">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header inverted as="h2" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                type="email"
                name="email"
                value={email}
                id="email"
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                id="password"
                onChange={handleChange}
              />
              <FormField>
                {errors && <Message negative>{errors}</Message>}
              </FormField>
              <Button onClick={handleClick} color="teal" fluid size="large">
                Login
              </Button>
              <Message>
                New to us? <Link to="/register">Sign Up</Link>
              </Message>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Login;
