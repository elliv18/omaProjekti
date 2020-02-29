export default `
    type Query {
        allForSale(input: AllForSaleInput): [ForSale]
    }

    input AllForSaleInput {
        first: Int
        after: String,
        filter: String
    }

`;

