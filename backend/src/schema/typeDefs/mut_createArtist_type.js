export default `
    type Mutation {
        createArtist(input: CreateArtistInput!): CreateArtistPayload
    }

    input CreateArtistInput {
        firstName: String!
        lastName: String!
    }
    type CreateArtistPayload {
        artist: Artist
    }
`;  