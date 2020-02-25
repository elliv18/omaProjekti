import gql from "graphql-tag";


const ADD_TO_SALE = gql`
  mutation mutation($price: String, $vinyls: [String]) {
    createForSale(input: { price: $price, vinyls: $vinyls }) {
       forSale{
         id
       }
    }
  }
`;
export default ADD_TO_SALE


