import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGH_OUT_MUTATION = gql`
  mutation SIGH_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = props => (
  <Mutation
    mutation={SIGH_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => <button onClick={signout}>Sign Out</button>}
  </Mutation>
);

export default Signout;
