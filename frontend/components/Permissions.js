import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Table from './styles/Table';
import Error from './ErrorMessage';
import SickButton from './styles/SickButton';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMDELETE',
  'ITEMUPDATE',
  'PERMISSONUPDATE',
];

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, error, loading }) => (
      <div>
        <Error error={error} />
        <div>
          <h2>Manage Permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {possiblePermissions.map(permission => (
                  <th key={permission}>{permission}</th>
                ))}
                <th>🥊</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <User key={user.id} user={user} />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )}
  </Query>
);

class User extends React.Component {
  render() {
    const { email, name, id } = this.props.user;

    return (
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        {possiblePermissions.map((permission, i) => (
          <td key={`${id}-${permission}`}>
            <label htmlFor={`${id}-permission-${permission}`}>
              <input type="checkbox" />
            </label>
          </td>
        ))}
        <td>
          <SickButton>Update</SickButton>
        </td>
      </tr>
    );
  }
}

export default Permissions;
