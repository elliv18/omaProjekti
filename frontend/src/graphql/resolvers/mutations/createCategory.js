import gql from "graphql-tag";


const ADD_Category = gql`
  mutation mutation($name: String!) {
    createCategory(input: { name: $name }) {
        category {
            id,
            name
        }
    }
  }
`;
export default ADD_Category


