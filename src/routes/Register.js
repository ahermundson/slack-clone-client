import React from 'react';
import {
  Form,
  Container,
  Header,
  Input,
  Button,
  Message
} from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends React.Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async () => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: ''
    });
    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });

    console.log(response);

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  };
  render() {
    const {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError
    } = this.state;

    const errorList = [];
    if (usernameError) {
      errorList.push(usernameError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Form>
          <Form.Field error={!!usernameError}>
            <Input
              name="username"
              onChange={this.onChange}
              fluid
              placeholder="Username"
              value={username}
            />
          </Form.Field>
          <Form.Field error={!!emailError}>
            <Input
              name="email"
              onChange={this.onChange}
              fluid
              placeholder="Email"
              value={email}
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input
              name="password"
              onChange={this.onChange}
              type="password"
              fluid
              placeholder="Password"
              value={password}
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
