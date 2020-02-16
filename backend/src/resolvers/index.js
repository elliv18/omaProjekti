import queries from './queries'
import { signup, createArtist } from './mutations'
import { getUserById } from './queries'
const { mergeResolvers } = require('merge-graphql-schemas')


const resolvers = [
    getUserById,
    signup,
    createArtist
]
export default mergeResolvers(resolvers)