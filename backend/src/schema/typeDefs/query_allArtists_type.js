export default `
    type Query {
        allArtists(input: AllArtistsInput): [Artist]
    }

    input AllArtistsInput {
        first: Int
        after: String,
        filter: String
    }

`;

