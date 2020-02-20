export default `
    type Query {
        getUserById(input: GetUserInput!): GetUserPayload
    }

    input GetUserInput {
        id: String!
    }
    type GetUserPayload {
        user: User
    }
`;

