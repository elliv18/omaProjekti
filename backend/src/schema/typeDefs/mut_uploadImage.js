export default `
type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Mutation {
    uploadImage(file: Upload!): File!
  }

  scalar Upload
`;  
