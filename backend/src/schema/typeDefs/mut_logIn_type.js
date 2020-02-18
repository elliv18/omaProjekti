export default `
    type Mutation {
        logIn(input: LogInInput!): LogInPayload
    }

    input LogInInput {
        email: String!
        password: String!
    }
    type LogInPayload {
        jwt: String
    }
`;  