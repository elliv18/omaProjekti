export default `
    type Mutation {
        createForSale(input: CreateForSaleInput!): CreateForSalePayload
    }

    input CreateForSaleInput {
        price: String
        vinyls: [String]
    }
    type CreateForSalePayload {
        forSale: ForSale
    }
`;  