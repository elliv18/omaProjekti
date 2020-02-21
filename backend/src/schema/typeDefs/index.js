import { mergeTypes } from "merge-graphql-schemas";
import tables from './tables'
//Quaries
import getUserById from './query_getUserById_type'
import validateJwt from './query_validateJwt_type'
import getCurrentUser from './query_getCurrentUser'

//Mutations
import signUp from './mut_signUp_type'
import logIn from './mut_logIn_type'
import createCategory from './mut_createCategory_type'
import createArtist from './mut_createArtist_type'
import createVinyl from './mut_createVinyl_type'
const types = [
    tables,
    getUserById,
    signUp,
    logIn,
    createCategory,
    createArtist,
    createVinyl,
    validateJwt,
    getCurrentUser
]

export default mergeTypes(types, { all: true })