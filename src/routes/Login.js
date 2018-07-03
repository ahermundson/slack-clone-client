import React from 'react';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import {
  Message,
  Form,
  Container,
  Header,
  Input,
  Button
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      errors: {}
    });
  }

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password }
    });

    console.log(response);
    const { ok, token, refreshToken, errors } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const {
      email,
      password,
      errors: { emailError, passwordError }
    } = this;

    const errorList = [];
    if (passwordError) {
      errorList.push(passwordError);
    }
    if (emailError) {
      errorList.push(emailError);
    }

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form>
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

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
