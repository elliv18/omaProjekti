import gql from "graphql-tag";


const ADD_TO_SALE = gql`
  mutation mutation($pricePcs: String, $priceTotal: String, $vinyls: [String], $isSale: Boolean, $name: String, $description: String) {
    createForSale(input: { pricePcs: $pricePcs, priceTotal: $priceTotal, vinyls: $vinyls, isSale: $isSale, name: $name, description: $description }) {
       forSale{
         id
       }
    }
  }
`;
export default ADD_TO_SALE


