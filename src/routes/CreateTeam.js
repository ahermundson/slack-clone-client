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

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      errors: {}
    });
  }

  onSubmit = async () => {
    const { name } = this;
    let response = null;

    try {
      response = await this.props.mutate({
        variables: { name }
      });
    } catch (err) {
      console.log(err);
      this.props.history.push('/login');
      return;
    }

    const { ok, errors } = response.data.createTeam;
    if (ok) {
      this.props.history.push('/');
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
      name,
      errors: { nameError }
    } = this;

    const errorList = [];
    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <Container text>
        <Header as="h2">Create Team</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input
              name="name"
              onChange={this.onChange}
              fluid
              placeholder="Name"
              value={name}
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

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
