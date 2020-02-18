import { mergeTypes } from "merge-graphql-schemas";
import tables from './tables'
//Quaries
import getUserById from './query_getUserById_type'
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
    createVinyl
]

export default mergeTypes(types, { all: true })