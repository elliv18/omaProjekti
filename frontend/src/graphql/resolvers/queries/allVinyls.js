import gql from 'graphql-tag';

const ALL_VINYLS = gql`
  query {
    allVinyls {
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
        name
      }
    }
  }
`;

export default ALL_VINYLS