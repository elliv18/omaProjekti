import gql from 'graphql-tag';

const GET_CURRENT_USER = gql`
query {
    getCurrentUser {
      id
      name
      type
    }
}
`;
export default GET_CURRENT_USER