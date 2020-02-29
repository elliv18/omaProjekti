export default `
    type Mutation {
        createForSale(input: CreateForSaleInput!): CreateForSalePayload
    }

    input CreateForSaleInput {
        pricePcs: String
        priceTotal: String
        vinyls: [String]
        isSale: Boolean
        name: String
        description: String
    }
    type CreateForSalePayload {
        forSale: ForSale
    }
`;  