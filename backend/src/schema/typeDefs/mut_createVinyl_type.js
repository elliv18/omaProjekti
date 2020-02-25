export default `
    type Mutation {
        createVinyl(input: CreateVinylInput!): CreateVinylPayload
    }

    input CreateVinylInput {
        name: String!
        year: String
        type: String!
        category: String!
        condition: String
        artists: [String!]!
        forSale: Boolean
    }
    type CreateVinylPayload {
        vinyl: Vinyl
    }
`;  