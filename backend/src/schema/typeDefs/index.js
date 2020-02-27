import { mergeTypes } from "merge-graphql-schemas";
import tables from './tables'
//Quaries
import getUserById from './query_getUserById_type'
import validateJwt from './query_validateJwt_type'
import getCurrentUser from './query_getCurrentUser'
import allVinyls from './query_allVinyls_type'
import allCategories from './query_allCategories'
import allArtists from './query_allArtists_type'
import getCounts from './query_getCounts_type'

//Mutations
import signUp from './mut_signUp_type'
import logIn from './mut_logIn_type'
import createCategory from './mut_createCategory_type'
import createArtist from './mut_createArtist_type'
import createVinyl from './mut_createVinyl_type'
import createForSale from './mut_create_forSale_type'
import deleteArtists from './mut_DeleteArtists'
import updateVinyls from './mut_updateVinyls_type'
const types = [
    tables,
    getUserById,
    allVinyls,
    allCategories,
    allArtists,
    getCounts,
    signUp,
    logIn,
    createCategory,
    createArtist,
    createVinyl,
    validateJwt,
    getCurrentUser,
    createForSale,
    deleteArtists,
    updateVinyls
]

export default mergeTypes(types, { all: true })