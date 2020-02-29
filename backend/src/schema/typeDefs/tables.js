export default `
    #########
    # Enums #
    #########

    enum UserType {
        ADMIN
        USER
      }

    ########
    # User #
    ########

    type User {
        id: ID!
        type: UserType!
        name: String!,
        email: String!
        password: String!
        createdAt: String
        updatedAt: String
      }

    ########
    # Vinyl #
    ########

    type Vinyl {
        id: ID!
        name: String!
        year: String
        type: String!
        category: Category 
        condition: String
        artists: [Artist!]!
        forSale: Boolean
        sale: ForSale
        createdAt: String
        updatedAt: String
      }

    ########
    # Artist #
    ########
    type Artist {
        id: ID!
        firstName: String!
        lastName: String!
        vinyls: [Vinyl]
        createdAt: String
        updatedAt: String
      }

    ########
    # Category #
    ########

    type Category {
        id: ID!
        name: String!
        vinyls: [Vinyl]
        createdAt: String
        updatedAt: String
      }

      ########
      # ForSale #
      ########

    type ForSale {
      id: ID!
      vinyls: [Vinyl]
      price: String
      pricePcs: String
      priceTotal: String
      name: String
      description: String
      createdAt: String
      updatedAt: String
    }

 
`;