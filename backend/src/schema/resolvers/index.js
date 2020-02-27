import relations from './relations'
import { signUp, login, createArtist, createVinyl, createCategory, createForSale, deleteArtists, updateVinyls } from './mutations'
import { getUserById, validateJwt, getCurrentUser, allVinyls, allCategories, allArtists, getCounts } from './queries'
const { mergeResolvers } = require('merge-graphql-schemas')


const resolvers = [
    relations,
    getUserById,
    validateJwt,
    getCurrentUser,
    allVinyls,
    allCategories,
    allArtists,
    getCounts,

    signUp,
    login,
    createArtist,
    createCategory,
    createVinyl,
    createForSale,

    deleteArtists,

    updateVinyls

]
export default mergeResolvers(resolvers)