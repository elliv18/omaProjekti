import React from 'react'
import { withApollo } from 'react-apollo'
import { ALL_ARTISTS } from '../graphql/resolvers/queries'
import Loading from '../components/Loading'
import { Typography, Grid, makeStyles, IconButton, TextField, Tooltip } from '@material-ui/core';
//import DeleteIcon from '@material-ui/icons/Delete';
import InfiniteScroll from 'react-infinite-scroll-component';
import helpers from '../helpers'
import LoadingSpinner from '@material-ui/core/CircularProgress';
import { DELETE_ARTISTS } from '../graphql/resolvers/mutations';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NewArtist from '../components/NewArtist';
import ArtistCard from '../components/ArtistCard'
import DeleteConfirmation from '../components/DeleteConfirm2';

const styles = makeStyles(theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.secondary.main,
            outline: '1px solid slategrey'
        }
    },
    expansionPanel: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1)
    },
    content: {
        [theme.breakpoints.up('sm')]: {

            position: 'absolute',
            top: 55, bottom: 0, right: 0, left: 0,
            overflow: 'auto',
            //    backgroundColor: 'lightGrey',
        },
        [theme.breakpoints.down('sm')]: {

            padding: 6,
            position: 'absolute',
            top: 55, bottom: 0, right: 0, left: 0,
            overflow: 'auto',
            //    backgroundColor: 'lightGrey',
        }
    },
    header: {
        position: 'relative',
        height: 55,
        //     backgroundColor: 'grey',

    },
    title: {
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            top: 8,
            left: 8,
            fontSize: 24
        },
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
            height: 39,
            width: 120,
            position: 'absolute',
            top: 8,
            left: 'calc(50vh + 120px)',
            fontSize: 30
        }
    },
    expanded: {
        backgroundColor: '#e8e8e8',
    },
    gridLeft: {
        textAlign: 'left'
    },
    gridRight: {
        textAlign: 'right',
    },
    gridCenter: {
        textAlign: 'center'
    },
    search: {
        position: 'absolute',
        right: 16,
        bottom: 8,
    },
    input1: {
        height: 2
    },
    infiniteScroll: {
        width: '100%',
        padding: theme.spacing(1)
    },
    timeGridContainer: {
        width: 300
    },

    vinyls: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(3),
        borderTop: '1px solid red',
    },

    add: {
        position: 'absolute',
        bottom: 32,
        left: 16,
    }


}))

const Artists = React.memo(function Artists(props) {
    /* const { loading, error, data, fetchMore } = useQuery(ALL_ARTISTS, {
         variables: {
             first: 20
         },
         fetchPolicy: "cache-and-network",
         notifyOnNetworkStatusChange: true
 
     })*/
    const [data, setData] = React.useState([])
    const [hasMore, setHasMore] = React.useState(true)

    const [open, setOpen] = React.useState({
        data: [],
        newArtist: false,
        openDelete: false
    })

    const [nameID, setNameID] = React.useState({
        names: [],
        ids: []
    })
    const classes = styles()

    // **************** FETCH **********************
    const fetch = React.useCallback(async (filter) => {
        console.log('Fetch')
        await props.client.query({
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
    }, [props.client])

    // **************** EFFECT **********************

    React.useEffect(() => {
        fetch()
    }, [fetch])

    // **************** FUNCTIONS **********************

    const openNewDialog = (data) => {
        setOpen({ newArtist: true })
    }
    const closeNewDialog = () => {
        setOpen({ newArtist: false })
    }

    const openDeleteConfirm = (id, name) => {
        //setAnchorEl(event.currentTarget);
        setOpen({ ...open, openDelete: true })
        setNameID({
            names: [name],
            ids: [id]
        })
    };
    const closeDeleteConfirm = () => {
        setOpen({ ...open, openDelete: false })

    };
    const handleSearch = ({ target: { value } }) => {
        /*  let newList = data.allArtists.filter(filter => {
              return filter.name.toLowerCase().includes(value)
          })*/

        if (value.length >= 3) {
            fetch(value)
        }
        else {
            fetch()
        }

    }
    const onFetchMore = () => {
        props.client.query({
            query: ALL_ARTISTS,
            variables: {
                first: 30,
                after: data[data.length - 1].id
            }
        })
            .then(res => {

                let temp = data.slice()
                const data2 = res.data.allArtists
                console.log(data2)
                temp.push(...data2)
                setData(temp)
                if (data2.length === 0)
                    setHasMore(false)
            })
            .catch(e => console.log(e))
    }

    const deleteArtists = () => {
        console.log('delete', nameID.ids)
        const id = nameID.ids
        props.client.mutate({
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



    // **************** RETURNS **********************

    if (data.length === 0) { return <Loading open={true} /> }
    /*  if (error) {
          console.log(error)
      }*/

    console.log('data', data)
    return (
        <div>
            <div className={classes.header}>
                <Typography className={classes.title}>
                    Artistit
                </Typography>
                <Tooltip title="Kirjoita vähintään 3 kirjainta hakeaksesi" arrow placement="left">
                    <TextField
                        className={classes.search}
                        InputProps={{ classes: { input: classes.input1 } }}
                        onChange={handleSearch}
                        variant="outlined"
                        placeholder="Search..."
                    />
                </Tooltip>


            </div>
            <div className={classes.content} >

                <InfiniteScroll
                    className={classes.infiniteScroll}
                    height={'calc(100vh - 125px)'}
                    dataLength={data.length}
                    next={onFetchMore}
                    hasMore={hasMore}
                    loader={<div style={{ textAlign: 'center' }}><LoadingSpinner /></div>}

                    endMessage={
                        <Typography variant="h6">
                            Jee, kaikki artistit on jo listattu
                        </Typography>
                    }
                >

                    <Grid container spacing={2} justify="center" alignItems="flex-start"
                        style={{
                            width: '100%',
                            margin: 'auto',
                            padding: 10
                        }}
                    >
                        {data.map((row, i) => {
                            const name = helpers.Capitalize(row.firstName) + " " + helpers.Capitalize(row.lastName)
                            return (
                                <ArtistCard
                                    key={i}
                                    id={row.id}
                                    name={name}
                                    created={row.createdAt}
                                    updated={row.updatedAt}
                                    vinyls={row.vinyls}
                                    openDelete={openDeleteConfirm}
                                />
                            )
                        })}
                    </Grid>
                </InfiniteScroll>
                <IconButton className={classes.add} onClick={openNewDialog}>
                    <AddCircleIcon fontSize="large" style={{ color: 'green' }} />
                </IconButton>
            </div>
            {open.newArtist ? <NewArtist open={open.newArtist} handleClose={closeNewDialog} /> : null}

            <DeleteConfirmation
                open={open.openDelete}
                handleClose={closeDeleteConfirm}
                title={"Haluatko varmasti poistaa seuraavat artistit"}
                warning={"Huom! Poistaminen poistaa myös kaikki tämän artistin levyt!"}
                delete={deleteArtists}
                names={nameID.names}
            />
        </div>
    )
})

export default withApollo(Artists)