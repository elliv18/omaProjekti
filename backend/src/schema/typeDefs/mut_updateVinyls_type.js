export default `
    type Mutation {
        updateVinyls(input: UpdateVinylsInput!): UpdateVinylsPayload
    }

    input UpdateVinylsInput {
        ids: [String!]!
        name: String
        forSale: Boolean
    }
    type UpdateVinylsPayload {
        count: Long
    }
   
    scalar Long

`;  