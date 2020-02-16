import queries from './queries'
import { createArtist, signUp, login } from './mutations'
import { getUserById } from './queries'
const { mergeResolvers } = require('merge-graphql-schemas')


const resolvers = [
    getUserById,
    createArtist,
    signUp,
    login
]
export default mergeResolvers(resolvers)