import gql from "graphql-tag";


const SIGNUP_MUTATION = gql`
  mutation loginMutation($name: String!, $email: String!, $password: String!, $passwordAgain: String!) {
    signUp(input: { name: $name, email: $email, password: $password, passwordAgain: $passwordAgain }) {
      user {
          id,
          name,
          email
      }
    }
  }
`;
export default SIGNUP_MUTATION
