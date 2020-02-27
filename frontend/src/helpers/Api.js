import { withApollo } from "react-apollo"

const AddForSale = (vinyls, price) => client => {
    /*  props.client.mutate({
          mutation: ADD_TO_FORSALE,
          variables: {
              vinyls: vinyls,
              price: price
          }
      })
          .then(res => {
              console.log(res)
              return res
          })
          .catch(e => {
              console.log(e)
              return e
          })*/
    console.log('TOIMII', vinyls, price, client)


}

export default withApollo({
    AddForSale
})