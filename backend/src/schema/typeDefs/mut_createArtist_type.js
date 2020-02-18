export default `
    type Mutation {
        createArtist(input: CreateArtistInput!): CreateArtistPayload
    }

    input CreateArtistInput {
        name: String!
    }
    type CreateArtistPayload {
        artist: Artist
    }
`;  