import gql from 'graphql-tag';

const ALL_ARTISTS = gql`
  query allArtists($first: Int, $after: String) {
    allArtists (input: {first: $first, after: $after }) {
      id
      name
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
    }
  }
`;

export default ALL_ARTISTS
