export default `
    type Mutation {
        createVinyl(input: CreateVinylInput!): CreateVinylPayload
    }

    input CreateVinylInput {
        name: String!
        year: String
        type: VinylType!
        category: String!
        condition: ConditionType
        artists: [String!]!
    }
    type CreateVinylPayload {
        vinyl: Vinyl
    }
`;  