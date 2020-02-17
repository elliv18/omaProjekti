import queries from './queries'
import { signUp, login, createArtist, createVinyl } from './mutations'
import { getUserById } from './queries'
const { mergeResolvers } = require('merge-graphql-schemas')


const resolvers = [
    getUserById,

    signUp,
    login,
    createArtist,
    createVinyl

]
export default mergeResolvers(resolvers)