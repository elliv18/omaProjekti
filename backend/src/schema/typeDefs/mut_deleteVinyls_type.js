export default `
    type Mutation {
        deleteVinyls(input: DeleteVinylsInput!): DeleteVinylsPayload
    }

    input DeleteVinylsInput {
        ids: [String]!
    }
    type DeleteVinylsPayload {
        count: Long
    }

    scalar Long

`;  