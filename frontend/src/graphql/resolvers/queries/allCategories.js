import gql from 'graphql-tag';

const ALL_CATEGORIES = gql`
  query allCategories($first: Int, $after: String, $filter: String, $sortBy: String) {
    allCategories(input: {first: $first, after: $after, filter: $filter, sortBy: $sortBy}) {
        id,
        name,
        vinyls{
            id,
            name,
            type
        }
    }
  }
`;

export default ALL_CATEGORIES
