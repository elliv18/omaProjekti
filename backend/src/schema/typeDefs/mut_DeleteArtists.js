export default `
    type Mutation {
        deleteArtists(input: DeleteArtistsInput!): DeleteArtistsPayload
    }

    input DeleteArtistsInput {
        ids: [String]!
    }
    type DeleteArtistsPayload {
        deleted: [Artist]
    }
`;  