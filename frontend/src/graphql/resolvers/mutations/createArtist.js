import gql from "graphql-tag";


const ADD_ARTIST = gql`
  mutation mutation($firstName: String!, $lastName: String!) {
    createArtist(input: { firstName: $firstName, lastName: $lastName }) {
        artist {
            id,
            firstName,
            lastName
        }
    }
  }
`;
export default ADD_ARTIST


