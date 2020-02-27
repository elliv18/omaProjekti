import gql from "graphql-tag";


const ADD_TO_SALE = gql`
  mutation mutation($pricePcs: String, $priceTotal: String, $vinyls: [String], $isSale: Boolean) {
    createForSale(input: { pricePcs: $pricePcs, priceTotal: $priceTotal, vinyls: $vinyls, isSale: $isSale }) {
       forSale{
         id
       }
    }
  }
`;
export default ADD_TO_SALE


