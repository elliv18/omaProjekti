import gql from "graphql-tag";


const UPDATE_VINYLS = gql`
  mutation mutation($ids: [String!]!, $name: String!, $forSale: Boolean) {
    signUp(input: { name: $name, ids: $ids, forSale: $forSale}) {
      user {
          id,
          name,
          email
      }
    }
  }
`;
export default UPDATE_VINYLS
