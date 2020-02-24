import gql from 'graphql-tag';

const ALL_ARTISTS = gql`
  query allArtists($first: Int, $after: String, $filter: String) {
    allArtists (input: {first: $first, after: $after, filter: $filter }) {
      id
      firstName
      lastName
      vinyls{
        id
        name
        year
        type
        condition
        category {
          id
          name
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default ALL_ARTISTS
