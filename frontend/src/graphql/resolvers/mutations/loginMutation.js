import gql from "graphql-tag";


const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    logIn(input: { email: $email, password: $password }) {
      jwt
    }
  }
`;
export default LOGIN_MUTATION