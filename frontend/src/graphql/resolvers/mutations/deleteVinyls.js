import gql from "graphql-tag";


const DELETE_VINYLS = gql`
  mutation mutation($ids: [String]!) {
    deleteVinyls(input: { ids: $ids }) {
        count
    }
  }
`;
export default DELETE_VINYLS