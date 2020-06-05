import relations from './relations'
import { signUp, login, createArtist, createVinyl, createCategory, createForSale, deleteArtists, updateVinyls, deleteVinyls, uploadImage } from './mutations'
import { getUserById, validateJwt, getCurrentUser, allVinyls, allCategories, allArtists, getCounts, allForSale } from './queries'
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
    allForSale,

    signUp,
    login,
    createArtist,
    createCategory,
    createVinyl,
    createForSale,

    deleteArtists,
    deleteVinyls,

    updateVinyls,
    uploadImage

]
export default mergeResolvers(resolvers)