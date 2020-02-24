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
        firstName,
        lastName
      }
    }
  }
`;

export default ALL_VINYLS