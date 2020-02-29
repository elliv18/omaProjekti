import gql from 'graphql-tag';

const ALL_FOR_SALE = gql`
  query allForSale($first: Int, $after: String, $filter: String) {
    allForSale(input: {first: $first, after: $after, filter: $filter }) {
      pricePcs
      priceTotal
      name
      description
      vinyls {
        id
        name
        year
        condition
        artists {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export default ALL_FOR_SALE
