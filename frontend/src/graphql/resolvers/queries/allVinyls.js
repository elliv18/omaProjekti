import gql from 'graphql-tag';

export const ALL_VINYLS = gql`
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
      
    }
  }
`;