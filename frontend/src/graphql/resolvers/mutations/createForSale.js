import gql from "graphql-tag";


const ADD_TO_SALE = gql`
  mutation mutation($price: String!, $vinyl: [String!]!) {
    createForSale(input: { price: $price, vinyl: $vinyl }) {
        forSale {
            id,
            price
        }
    }
  }
`;
export default ADD_TO_SALE


