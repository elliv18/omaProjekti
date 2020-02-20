import gql from 'graphql-tag';

const GET_USER_BY_ID = gql`
query getUserById($id: String!) {
    getUserById(input: { id: $id }) 
    {
    user {
      id
      name
    }
  }
}
`;
export default GET_USER_BY_ID