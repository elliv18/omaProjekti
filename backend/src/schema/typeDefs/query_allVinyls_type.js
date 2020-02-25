export default `
    type Query {
        allVinyls(input: AllVinylInput): [Vinyl]
    }

    input AllVinylInput {
        first: Int
        after: String,
        filter: String,
        sortBy: String
    }

`;
