export default `
    type Query {
        getCounts: Counts
    }

    type Counts {
        vinylCount: Int
        artistCount: Int
        categoryCount: Int
    }
`;

