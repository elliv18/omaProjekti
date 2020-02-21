import queries from './queries'
import { signUp, login, createArtist, createVinyl, createCategory, createForSale } from './mutations'
import { getUserById, validateJwt, getCurrentUser } from './queries'
const { mergeResolvers } = require('merge-graphql-schemas')


const resolvers = [
    getUserById,
    validateJwt,
    getCurrentUser,

    signUp,
    login,
    createArtist,
    createCategory,
    createVinyl,
    createForSale

]
export default mergeResolvers(resolvers)