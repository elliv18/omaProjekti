import gql from "graphql-tag";


const DELETE_ARTISTS = gql`
  mutation mutation($ids: [String]!) {
    deleteArtists(input: { ids: $ids }) {
        deleted {
            id
        }
    }
  }
`;
export default DELETE_ARTISTS