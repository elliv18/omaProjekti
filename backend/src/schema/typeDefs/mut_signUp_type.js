export default `
    type Mutation {
        signUp(input: SignUpInput!): SignUpPayload
    }

    input SignUpInput {
        name: String!
        email: String!
        password: String!
        passwordAgain: String!
    }
    type SignUpPayload {
        user: User!
    }
`;  