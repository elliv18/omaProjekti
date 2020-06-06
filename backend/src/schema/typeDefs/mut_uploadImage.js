export default `
type File {
    filename: String!
    mimetype: String!
    encoding: String!
    id: String!
  }

  type Mutation {
    uploadImage(file: Upload!, id: String!): File!
  }

  scalar Upload
`;  
