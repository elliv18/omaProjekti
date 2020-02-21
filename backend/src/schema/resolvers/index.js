import queries from './queries'
import { signUp, login, createArtist, createVinyl, createCategory } from './mutations'
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
    createVinyl

]
export default mergeResolvers(resolvers)