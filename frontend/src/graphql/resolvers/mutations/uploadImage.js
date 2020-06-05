import gql from "graphql-tag";


const UPLOAD_IMAGE = gql`
mutation uploadFile($file: Upload!) {
    uploadImage(file: $file) {
      filename
    }
}
`;
export default UPLOAD_IMAGE

