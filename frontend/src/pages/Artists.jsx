import React from 'react'
import { withApollo } from 'react-apollo'
import Loading from '../components/Loading'
import { Typography, Grid, makeStyles, TextField, Fab } from '@material-ui/core';
//import DeleteIcon from '@material-ui/icons/Delete';
import InfiniteScroll from 'react-infinite-scroll-component';
import helpers from '../helpers'
import LoadingSpinner from '@material-ui/core/CircularProgress';
import NewArtist from '../components/NewArtist';
import ArtistCard from '../components/ArtistCard'
import DeleteConfirmation from '../components/DeleteConfirm2';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import API from '../services/api'

const styles = makeStyles(theme => ({
    /* '@global': {
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
     },*/
    root: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        //  backgroundColor: 'black'
    },
    header: {
        textAlign: 'center',
        overflow: 'hidden',
        width: '100%'

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
        right: 32,
        color: 'green'
    },

    toolbar: {
        position: 'sticky',
        top: 0,
        width: '100%',
        backgroundColor: 'white',
        height: 55,
        zIndex: 1
    },
    infiniteScroll: {
        margin: 0,
        padding: 0
    },


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
        openDelete: false,
        openMenuArc: null
    })

    const [nameID, setNameID] = React.useState({
        names: [],
        ids: []
    })
    const classes = styles()

    // **************** FETCH **********************


    // **************** EFFECT **********************

    React.useEffect(() => {
        API.fetchArtists(props.client, "", setData)
    }, [props.client])

    // **************** FUNCTIONS **********************

    const openNewDialog = (data) => {
        setOpen({ ...open, newArtist: true })
    }
    const closeNewDialog = () => {
        setOpen({ ...open, newArtist: false })
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

    const handleOpenMenu = (event) => {
        setOpen({ ...open, openMenuArc: event.currentTarget })
    }
    const handleSearch = ({ target: { value } }) => {
        /*  let newList = data.allArtists.filter(filter => {
              return filter.name.toLowerCase().includes(value)
          })*/

        if (value.length === 0) {
            API.fetchArtists(props.client, "", setData)

        }
        else {
            API.fetchArtists(props.client, value, setData)
        }

    }



    // **************** RETURNS **********************

    if (data.length === 0) { return <Loading open={true} /> }
    /*  if (error) {
          console.log(error)
      }*/

    console.log('data', data)
    return (
        <div className={classes.root}>

            <InfiniteScroll
                className={classes.infiniteScroll}
                height={'calc(100vh - 65px)'}
                dataLength={data.length}
                next={() => API.fetchMoreArtists(props.client, data, setData, setHasMore)}
                hasMore={hasMore}
                loader={<div style={{ textAlign: 'center' }}><LoadingSpinner /></div>}

                endMessage={
                    <Typography variant="h6">
                        Jee, kaikki artistit on jo listattu
                        </Typography>
                }
            >

                <div className={classes.header}>
                    <Typography variant="h2">
                        Artistit
                    </Typography>
                </div>

                <div className={classes.toolbar}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={6} className={classes.left}>
                            <TextField
                                variant="outlined"
                                placeholder="Search..."
                                margin="dense"
                                onChange={handleSearch}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={6} className={classes.right}>

                        </Grid>
                    </Grid>
                </div>
                <Grid container spacing={1} justify="center" alignItems="flex-start"
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
            <Fab className={classes.add} color="primary" onClick={openNewDialog}>
                <SpeedDialIcon />
            </Fab>
            {open.newArtist ? <NewArtist open={open.newArtist} handleClose={closeNewDialog} /> : null}
            {console.log(open.openDelete)}
            <DeleteConfirmation
                open={open.openDelete}
                handleClose={closeDeleteConfirm}
                title={"Haluatko varmasti poistaa seuraavat artistit"}
                warning={"Huom! Poistaminen poistaa myös kaikki tämän artistin levyt!"}
                delete={() => API.deleteArtists(props.client, data, nameID, setData, closeDeleteConfirm)}
                names={nameID.names}
            />
        </div>
    )
})

export default withApollo(Artists)