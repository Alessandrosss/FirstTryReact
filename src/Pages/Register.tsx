import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.production.min";
import {
  Header,
  Container,
  Form,
  Button,
  FormField,
  Input,
  Message,
  Segment,
  Grid,
} from "semantic-ui-react";
import { AppContext } from "../App";

import { auth } from "../lib/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();
  const { setIsLIn, setToken, setErrors, errors, isLIn } =
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
      case "repeatPassword":
        setRepeatPassword(value);
        break;
    }
  };


/* HANDLE REGISTER BUTTON */
  const handleClick = () => {
    auth
      .register(email, password, repeatPassword)
      .then((res) => {
        if (res.message) setErrors(res.message);
        if (res.data) {
          setToken(res.data.token);
          setIsLIn(res.success);
          setErrors("");
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
            Register a new account
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
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Repeat Password"
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                id="repeatPassword"
                onChange={handleChange}
              />
              <FormField>
                {errors && <Message negative>{errors}</Message>}
              </FormField>
              <Button onClick={handleClick} color="teal" fluid size="large">
                Register
              </Button>
              <Message>
                Already registered? <Link to="/login">Sign In</Link>
              </Message>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Register;
