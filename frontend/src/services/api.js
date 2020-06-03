import Cookies from 'js-cookie'
import { ADD_ARTIST, DELETE_ARTISTS, ADD_VINYL, ADD_TO_FORSALE } from '../graphql/resolvers/mutations'
import { ALL_ARTISTS } from '../graphql/resolvers/queries'

const logout = () => {
    Cookies.remove('jwt')
}

// ************** ARTISTS ****************************

// FETCH
const fetchArtists = (client, filter, setData) => {
    console.log('Fetch')
    client.query({
        query: ALL_ARTISTS,
        variables: {
            first: 30,
            filter: filter
        },
    })
        .then(res => {
            if (res.data.allArtists.length > 0)
                setData(res.data.allArtists)
        })
}

const fetchMoreArtists = (client, data, setData, setHasMore) => {
    client.query({
        query: ALL_ARTISTS,
        variables: {
            first: 30,
            after: data[data.length - 1].id
        }
    })
        .then(res => {

            let temp = data.slice()
            const data2 = res.data.allArtists
            temp.push(...data2)
            setData(temp)
            if (data2.length === 0)
                setHasMore(false)
        })
        .catch(e => console.log(e))
}

// CREATE ARTISTS
const createArtist = (client, firstName, lastName, handleClose) => {
    console.log("Create artist")
    client.mutate({
        mutation: ADD_ARTIST,
        variables: {
            firstName: firstName,
            lastName: lastName
        }
    })
        .then(res => {
            console.log(res.data)
            handleClose()
        })
        .catch(e => console.log(e))
}

// DELETE ARTIST
const deleteArtists = (client, data, nameID, setData, closeDeleteConfirm) => {
    console.log('delete artist')
    const id = nameID.ids
    client.mutate({
        mutation: DELETE_ARTISTS,
        variables: { ids: id }
    })
        .then(res => {
            console.log(res.data)
            const ids = nameID.ids
            const data2 = data
            ids.forEach(rowId => {
                const index = data2.findIndex(row => row.id === rowId);
                if (index > -1) {
                    data2.splice(index, 1);
                }
            });

            setData(data2)
            closeDeleteConfirm()

        })
        .catch(e => console.log(e))
}

// ******************* VINYLS ***************************

// CREATE VINYL

const createVinyl = (client, name, year, condition, category, artists, type, price, forSale, saleName, saleDesc, addNew) => {
    client.mutate({
        mutation: ADD_VINYL,
        variables: {
            name: name,
            year: year.toString(),
            condition: condition,
            category: category,
            artists: artists,
            type: type,
            forSale: forSale
        }
    })
        .then(res => {
            console.log('res createVinyl')
            const data = res.data.createVinyl.vinyl

            if (forSale) {
                let tempVinyls = []
                tempVinyls.push(data.id)
                console.log('** ON SALE **', tempVinyls)
                client.mutate({
                    mutation: ADD_TO_FORSALE,
                    variables: {
                        vinyls: tempVinyls,
                        pricePcs: price,
                        isSale: true,
                        name: saleName,
                        description: saleDesc
                    }
                })
                    .then(res => {
                        console.log('SALE', res)
                    })
                    .catch(e => console.log(e))
            }
            const temp = [
                {
                    id: data.id, name: data.name, year: data.year, type: data.type,
                    condition: data.condition, category: data.category, artists: data.artists, forSale: data.forSale
                }
            ]
            console.log('TEMP*', temp)
            //                props.setData({ data: [...temp, ...props.data] })

            addNew(temp)
            //props.handleClose()
        })
        .catch(e => console.log(e))
}
export default {
    logout,
    fetchArtists,
    createArtist,
    deleteArtists,
    fetchMoreArtists,
    createVinyl
}