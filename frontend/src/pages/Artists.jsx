import React from 'react'
import { withApollo } from 'react-apollo'
import { ALL_ARTISTS } from '../graphql/resolvers/queries'
import Loading from '../components/Loading'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, ExpansionPanelActions, Button, Grid, makeStyles, IconButton, TextField, Tooltip, Popover } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfiniteScroll from 'react-infinite-scroll-component';
import helpers from '../helpers'
import TextyAnim from 'rc-texty'
import Moment from 'react-moment';
import LoadingSpinner from '@material-ui/core/CircularProgress';
import ShowDataDialog from '../components/ShowDataDialog';
import WarningIcon from '@material-ui/icons/Warning';
import { DELETE_ARTISTS } from '../graphql/resolvers/mutations';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NewArtist from '../components/NewArtist';

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
            backgroundColor: 'lightGrey',
        },
        [theme.breakpoints.down('sm')]: {

            padding: 6,
            position: 'absolute',
            top: 55, bottom: 0, right: 0, left: 0,
            overflow: 'auto',
            backgroundColor: 'lightGrey',
        }
    },
    header: {
        position: 'relative',
        height: 55,
        backgroundColor: 'grey',

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
    const [popOverStates, setPopOverStates] = React.useState({
        anchorEl: null
    })
    const [open, setOpen] = React.useState({
        dataDialog: false,
        data: [],
        newArtist: false
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

    const openDataDialog = (data) => {
        setOpen({ dataDialog: true, data: data })
    }
    const closeDataDialog = () => {
        setOpen({ dataDialog: false, data: [] })
    }

    const openNewDialog = (data) => {
        setOpen({ newArtist: true })
    }
    const closeNewDialog = () => {
        setOpen({ newArtist: false })
    }

    const openDeleteConfirm = (event, name, id) => {
        //setAnchorEl(event.currentTarget);

        setPopOverStates({
            anchorEl: event.currentTarget,
            id: id,
            name: name
        })
    };
    const closeDeleteConfirm = () => {
        console.log('CLOSE')
        setPopOverStates({
            anchorEl: null,
        })
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

    const deleteArtists = (id) => {
        console.log('delete', id)

        props.client.mutate({
            mutation: DELETE_ARTISTS,
            variables: { ids: id }
        })
            .then(res => {
                console.log(res.data)
                const data2 = data
                const index = data2.findIndex(row => row.id === id);
                if (index > -1) {
                    data2.splice(index, 1);
                    setData(data2)
                }

                closeDeleteConfirm()

            })
            .catch(e => console.log(e))
    }



    // **************** RETURNS **********************

    if (data.length === 0) { return <Loading open={true} /> }
    /*  if (error) {
          console.log(error)
      }*/

    console.log('length', data.length)
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

                    {data.map((row, i) => {
                        const name = helpers.Capitalize(row.firstName) + " " + helpers.Capitalize(row.lastName)
                        return (

                            <ExpansionPanel key={i} classes={{ expanded: classes.expanded }} elevation={3} className={classes.expansionPanel}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography variant="h5">
                                        {name}
                                    </Typography>

                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>

                                    <Grid container justify="center" alignItems="center">
                                        <Grid item md={3} xs={12} >
                                            <Typography variant="subtitle2">
                                                <strong>Artisti lisätty: </strong>
                                                <Moment format="DD-MM-YYYY HH:mm">
                                                    {row.createdAt}
                                                </Moment>
                                            </Typography>
                                        </Grid>

                                        <Grid item md={3} xs={12} >
                                            <Typography variant="subtitle2">
                                                <strong>Artisti päivitetty: </strong>
                                                <Moment format="DD-MM-YYYY HH:mm">
                                                    {row.updatedAt}
                                                </Moment>
                                            </Typography>
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => openDataDialog((row.vinyls))}
                                            >
                                                Näytä artistin levyt
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>

                                <ExpansionPanelActions>

                                    <Grid container>
                                        <Grid item xs={12} className={classes.gridLeft}>
                                            <IconButton
                                                onClick={event => openDeleteConfirm(event, name, row.id)}
                                            >
                                                <DeleteIcon style={{ color: 'red' }} />
                                            </IconButton>
                                        </Grid>
                                    </Grid>

                                </ExpansionPanelActions>

                            </ExpansionPanel>

                        )
                    })}
                </InfiniteScroll>
                <IconButton className={classes.add} onClick={openNewDialog}>
                    <AddCircleIcon fontSize="large" style={{ color: 'green' }} />
                </IconButton>
            </div>
            {open.dataDialog ? <ShowDataDialog open={open.dataDialog} data={open.data} handleClose={closeDataDialog} /> : null}
            {open.newArtist ? <NewArtist open={open.newArtist} handleClose={closeNewDialog} /> : null}
            {popOverStates.anchorEl !== null
                ? <DeleteConfirm
                    title={"Haluatko varmasti poistaa artistin?"}
                    states={popOverStates}
                    handleClose={closeDeleteConfirm}
                    deleteArtists={deleteArtists}
                />
                : null}
        </div>
    )
})

export default withApollo(Artists)

const styles2 = makeStyles(theme => ({
    popOver: {
    },
    buttonGrid: {
        padding: theme.spacing(2)
    },
    title: {
        padding: theme.spacing(2),
        backgroundColor: '#ebb42a'
    }
}))

function DeleteConfirm(props) {
    const open = Boolean(props.states.anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const classes = styles2()
    const [disabled, setDisabled] = React.useState(true)


    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDisabled(false)
        }, 4000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <Popover
            open={open}
            id={id}
            anchorEl={props.states.anchorEl}
            onClose={props.handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <div className={classes.popOver}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Grid container justify="center" alignItems="center" className={classes.title}>
                            <Grid item xs={2}>
                                <WarningIcon />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="h6" >
                                    {props.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={10}>
                                <Typography variant="subtitle1" >
                                    <strong>{props.states.name}</strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" style={{ color: 'red' }} >
                                    <TextyAnim >
                                        Huom! Poistaminen poistaa myös kaikki tämän artistin levyt!
                                    </TextyAnim>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} className={classes.buttonGrid}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            onClick={() => props.deleteArtists(props.states.id)}
                            disabled={disabled}
                        >
                            Kyllä
                        </Button>
                    </Grid>

                    <Grid item xs={6} className={classes.buttonGrid}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={props.handleClose}
                        >
                            Peruuta
                        </Button>
                    </Grid>
                </Grid>




            </div>

        </Popover >
    )
}

/*
<Grid container>
                                        {row.vinyls.map((vinyl, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle1">
                                                            <b>Levyn nimi: </b>                                                            {i + 1 === row.vinyls.length ? vinyl.name : vinyl.name + ", "}
                                                            {i + 1 === row.vinyls.length ? vinyl.name : vinyl.name + ", "}

                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="subtitle1">
                                                            <b>Levyn tyyppi</b>  {vinyl.type}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle1">

                                                            <b>Kategoria</b> {vinyl.category.name}
                                                        </Typography>
                                                    </Grid>
                                                    <hr />
                                                </React.Fragment>
                                            )
                                        })}

                                    </Grid>



                                        <Show show={showVinyls.id === row.id} >
                                            <br />
                                            {showVinyls.data.map((vinyl, i) => {
                                                return (
                                                    <Grid item xs={12} key={i} className={classes.vinyls} >
                                                        <Grid container >
                                                            <Grid item xs={12} md={2}  >
                                                                <Typography variant="h6">
                                                                    <b>Levyn nimi: </b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10}>
                                                                <Typography variant="subtitle1">
                                                                    {i + 1 === row.vinyls.length ? vinyl.name : vinyl.name + ", "}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item xs={12} md={2}>
                                                                <Typography variant="h6">
                                                                    <b>Levyn tyyppi</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={10}>
                                                                <Typography variant="subtitle1">
                                                                    {vinyl.type}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item xs={12} md={2} >
                                                                <Typography variant="h6">
                                                                    <b>Kategoria</b>
                                                                </Typography>

                                                            </Grid>
                                                            <Grid item xs={12} md={10} >
                                                                <Typography variant="subtitle1">
                                                                    {vinyl.category.name}
                                                                </Typography>

                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })}
                                        </Show>
*/