export default `
    type Mutation {
        createCategory(input: CreateNewCategoryInput!): CreateNewCategoryPayload
    }

    input CreateNewCategoryInput {
        name: String!
    }
    type CreateNewCategoryPayload {
        category: Category 
    }
`;  
