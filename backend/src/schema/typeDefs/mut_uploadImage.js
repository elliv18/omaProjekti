export default `
  type Mutation {
    uploadImage(file: Upload!, id: String!): String!
  }

  scalar Upload
`;  
