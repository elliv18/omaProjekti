import gql from 'graphql-tag';

const ALL_VINYLS = gql`
query allVinyls($first: Int, $after: String, $filter: String, $sortBy: String) {
  allVinyls (input: {first: $first, after: $after, filter: $filter, sortBy: $sortBy }) {
      id
      name
      year
      type
      condition
      category {
        id
        name
      }
      artists{
        id,
        firstName,
        lastName
      }
    }
  }
`;

export default ALL_VINYLS