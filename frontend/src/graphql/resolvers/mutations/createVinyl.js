import gql from "graphql-tag";

const ADD_VINYL = gql`
  mutation addMutation(
    $name: String!
    $year: String
    $type: String!
    $category: String!
    $condition: String
    $artists: [String!]!
    $forSale: Boolean
  ) {
    createVinyl(
      input: {
        name: $name
        year: $year
        type: $type
        category: $category
        condition: $condition
        artists: $artists
        forSale: $forSale
      }
    ) {
      vinyl {
        id
        name
        year
        type
        condition
        category {
          name
        }
        artists {
          firstName
          lastName
        }
       forSale,
       sale {
         id,
         price
       }
        
      }
    }
  }
`;

export default ADD_VINYL