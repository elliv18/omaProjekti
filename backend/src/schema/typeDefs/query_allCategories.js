export default `
    type Query {
        allCategories(input: AllCategoriesInput): [Category]
    }

    input AllCategoriesInput {
        first: Int
        after: String,
        filter: String
        sortBy: String
    }
`;


