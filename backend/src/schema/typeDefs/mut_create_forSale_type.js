export default `
    type Mutation {
        createForSale(input: CreateForSaleInput!): CreateForSalePayload
    }

    input CreateForSaleInput {
        price: String
        vinyl: [String!]!
    }
    type CreateForSalePayload {
        forSale: ForSale
    }
`;  