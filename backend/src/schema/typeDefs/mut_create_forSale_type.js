export default `
    type Mutation {
        createForSale(input: CreateForSaleInput!): CreateForSalePayload
    }

    input CreateForSaleInput {
        pricePcs: String
        priceTotal: String
        vinyls: [String]
        isSale: Boolean
    }
    type CreateForSalePayload {
        forSale: ForSale
    }
`;  