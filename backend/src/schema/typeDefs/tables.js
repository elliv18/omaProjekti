export default `
    #########
    # Enums #
    #########

    enum UserType {
        ADMIN
        USER
      }
    enum VinylType {
        LP
        SINGLE
        SAVIKIEKKO
      }
    enum ConditionType {
        EXCELLENT
        GOOD
        OKAY
        POOR
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
      }

    ########
    # Vinyl #
    ########

    type Vinyl {
        id: ID!
        name: String!
        year: String
        type: VinylType!
        category: Category 
        condition: ConditionType
        artists: [Artist!]!
        forSale: Boolean
      }

    ########
    # Artist #
    ########
    type Artist {
        id: ID!
        name: String!
        vinyls: [Vinyl] 
      }

    ########
    # Category #
    ########

    type Category {
        id: ID!
        name: String!
        vinyls: [Vinyl]
      }

      ########
      # ForSale #
      ########

    type ForSale {
      id: ID!
      vinyl: [Vinyl]
      price: String
    }

 
`;