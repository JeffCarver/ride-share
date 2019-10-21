import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from 'react-router-dom';
import app from "../base";
import { AuthContext } from '../auth/Auth';
import { 
  Button,
  Box,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/core';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Box p={4}>
      <h1>Log in</h1>
      <Box>
        <form onSubmit={handleLogin}>
          <FormControl>

            <FormLabel>
              Email
            </FormLabel>
            <Input
              name="email" type="email" placeholder="Email"
            />

            <FormLabel>
              Password
            </FormLabel>
            <Input
              name="password" type="password" placeholder="Password"
            />

          </FormControl>
          <Box>
            <Button 
              mt={4}
              variantColor="blue"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>

      <Box>
        <Link to="/signup">
          <Button
            mt={4}
            variantColor="blue"
            type="submit"
          >
            Sign Up
          </Button>
        </Link>
      </Box>

    </Box>
  );
};

export default withRouter(Login);