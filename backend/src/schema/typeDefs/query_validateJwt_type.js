export default `
    type Query {
        validateJwt(input: ValidateJwtInput!): ValidateJwtPayload
    }

    input ValidateJwtInput {
        id: String!
    }
    type ValidateJwtPayload {
       isValid: User!
    }
`;

