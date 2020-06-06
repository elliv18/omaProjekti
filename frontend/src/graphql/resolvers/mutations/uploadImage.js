import gql from "graphql-tag";


const UPLOAD_IMAGE = gql`
mutation uploadFile($file: Upload!, $id: String!) {
    uploadImage(file: $file, id: $id) {
      filename
    }
}
`;
export default UPLOAD_IMAGE

