const { mutations } = require('./mutations')
const { queries } = require('./queries')
const { mergeResolvers } = require('merge-graphql-schemas')


const resolvers = {
    queries,
    mutations
}
export default mergeResolvers(resolvers)