import React from 'react'
import { withApollo } from 'react-apollo'
import { ALL_VINYLS } from '../graphql/resolvers/queries'
import Loading from '../components/Loading'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, ExpansionPanelActions, Button, Grid, makeStyles, Tooltip, TextField, Select, MenuItem, Popover, FormControlLabel, Checkbox, Fab } from '@material-ui/core';
import helpers from '../helpers';
import NewVinyl from '../components/NewVinyl';
import LoadingSpinner from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ADD_TO_FORSALE } from '../graphql/resolvers/mutations';


import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EuroIcon from '@material-ui/icons/EuroSymbol';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteConfirm from '../components/DeleteConfirm';
import EditIcon from '@material-ui/icons/Edit';
import TextyAnim from 'rc-texty';
import { Alert } from '@material-ui/lab';


const styles = makeStyles(theme => ({
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
    add: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        // color: 'green'
    },
    infiniteScroll: {
        width: '100%',
        padding: theme.spacing(1)
    },
    header: {
        // position: 'relative',
        height: 55,
        backgroundColor: 'grey',

    },
    search: {
        position: 'absolute',
        right: 16,
        bottom: 8,
    },

    right: {
        textAlign: 'right'
    },
    center: {
        textAlign: 'center'
    },


}))


const Vinyls = React.memo(function Vinyls(props) {
    const classes = styles()

    const [hasMore, setHasMore] = React.useState(true)
    const [sortBy, setSortBy] = React.useState("createdAt_DESC")
    const [data, setData] = React.useState([])


    const [states, setStates] = React.useState({
        openNew: false,
        anchorElPrice: null,
        anchorElDelete: null,
        openSpeedDial: false,
        hidden: false,
        ids: [],
        names: []
    })


    const fetch = React.useCallback(async (filter, orderBy) => {
        console.log('Fetch', sortBy)
        await props.client.query({
            query: ALL_VINYLS,
            variables: {
                first: 30,
                filter: filter,
                sortBy: orderBy
            },
        })
            .then(res => {
                //    console.log('res', res.data.allVinyls)
                setData(res.data.allVinyls)
            })
            .catch(e => console.log(e))
    }, [props.client, sortBy])

    React.useEffect(() => {
        fetch()
    }, [fetch])

    const onFetchMore = () => {
        props.client.query({
            query: ALL_VINYLS,
            variables: {
                first: 30,
                after: data[data.length - 1].id
            }
        })
            .then(res => {

                let temp = data.slice()
                const data2 = res.data.allVinyls
                console.log(data2)
                temp.push(...data2)
                setData(temp)
                if (data2.length === 0)
                    setHasMore(false)
            })
            .catch(e => console.log(e))
    }

    const openNew = () => {
        //  setOpen({ new: true, speedDial: false })
        setStates({ ...states, openNew: true })
    }
    /*   const closeNew = () => {
          // setOpen({ new: false, speedDial: false })
   
       }*/


    /*
        const handleVisibility = () => {
            setOpen({ hidden: prevHidden => !open.prevHidden });
        };
    */
    const handleOpenSpeedDial = () => {
        //  setOpen({ speedDial: true });
        setStates({ ...states, openSpeedDial: true })
    };

    const handleCloseSpeedDial = () => {
        setStates({ ...states, openSpeedDial: false })
        //  setOpen({ speedDial: false });
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

    const handleCheckBox = (id, value, name) => {

        const currentIndexId = states.ids.indexOf(id);
        const currentIndexNames = states.names.indexOf(id);

        const newCheckedIds = [...states.ids];
        const newCheckedNames = [...states.names];

        if (currentIndexId === -1) {
            newCheckedIds.push(id);
            newCheckedNames.push(name)
        } else {
            newCheckedIds.splice(currentIndexId, 1);
            newCheckedNames.splice(currentIndexNames, 1);

        }

        setStates({
            ...states,
            ids: newCheckedIds,
            names: newCheckedNames
        })
    }


    const handleSort = event => {
        console.log(event.target.value)
        setSortBy(event.target.value)
        fetch("", event.target.value)
    }

    const openDeleteConfirm = event => {
        //setAnchorEl(event.currentTarget);

        /*   setOpen({
               speedDial: true,
               anchorElDelete: event.currentTarget,
               ids: selected.ids,
               names: selected.names
           })*/
        setStates({
            ...states,
            anchorElDelete: event.currentTarget,
        })
    };
    const handleClose = () => {
        console.log('CLOSE')
        /*   setOpen({
               speedDial: false,
               anchorEl: null,
               anchorElDelete: null,
           })*/
        setStates({
            ...states,
            openSpeedDial: false,
            anchorElDelete: false,
            anchorElPrice: false,
            openNew: false,
            ids: [],
            names: []
        })
    };
    const openPrice = (value, id) => {
        console.log('open', id)
        // setOpen({ anchorEl: value, data: id, speedDial: false })
        setStates({
            ...states,
            anchorElPrice: value,
        })
    }


    const deleteVinyl = (ids) => {
        console.log('DELETE VINYL', ids)
        handleClose()
    }
    if (data.length === 0) { return <Loading open={true} /> }
    //  console.log('DATA', states)


    return (
        <div>
            <div className={classes.header}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={7}>
                        <Tooltip title="Kirjoita vähintään 3 kirjainta hakeaksesi" arrow placement="bottom">
                            <TextField
                                fullWidth
                                margin="dense"
                                InputProps={{ classes: { input: classes.input1 } }}
                                onChange={handleSearch}
                                variant="outlined"
                                placeholder="Search..."
                            />
                        </Tooltip>
                    </Grid>


                    <Grid item xs={5} className={classes.right}>
                        <Select
                            value={sortBy}
                            onChange={handleSort}
                        >
                            <MenuItem value={"createdAt_DESC"}>Uusin (lisätty)</MenuItem>
                            <MenuItem value={"createdAt_ASC"}>Vanhin (lisätty)</MenuItem>
                            <MenuItem value={"year_ASC"}>Vanhin levy</MenuItem>
                            <MenuItem value={"year_DESC"}>Uusin levy</MenuItem>
                            <MenuItem value={"name_ASC"}>Nimi (a-ö)</MenuItem>
                            <MenuItem value={"name_DESC"}>Nimi (ö-a)</MenuItem>
                        </Select>
                    </Grid>
                </Grid>

            </div>
            <div className={classes.content}>
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
                        const backColor = row.forSale ? '#82ed91' : 'none'
                        return (
                            <ExpansionPanel elevation={3} key={i} className={classes.expansionPanel}>
                                <ExpansionPanelSummary
                                    style={{ backgroundColor: backColor }}

                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <FormControlLabel
                                        aria-label="Acknowledge"
                                        onClick={event => {
                                            event.stopPropagation()
                                            handleCheckBox(row.id, event.target.checked, row.name)
                                        }}
                                        //onFocus={event => event.stopPropagation()}
                                        control={<Checkbox checked={states.ids.indexOf(row.id) !== -1} />}
                                    />
                                    <Grid container>
                                        <Grid item xs={12} md={2}>
                                            <Typography variant="h6" className={classes.center}>
                                                <strong>Levyn nimi: </strong>
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={10}>
                                            <Typography variant="h6">
                                                {row.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <Grid item xs={12} md={2}>
                                            <Typography variant="subtitle1">
                                                <b>Tyyppi:</b> {row.type}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Typography variant="subtitle1">
                                                <b>Kunto: </b>{row.condition}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Typography variant="subtitle1">
                                                <b>Kategoria: </b>  {row.category.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Typography variant="subtitle1">
                                                <b>Vuosi </b>  {row.year}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Typography variant="subtitle1">
                                                <b>Myynnissä: </b>  {row.forSale.toString()}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <br />

                                            <Typography variant="subtitle1">
                                                <b>Artistit: </b>
                                                {row.artists.map((artist, i) => {
                                                    const name = helpers.Capitalize(artist.firstName) + " " + helpers.Capitalize(artist.lastName)
                                                    const a = i + 1 === row.artists.length ? name : name + ", "
                                                    return (a)
                                                })}
                                            </Typography>
                                            <hr />

                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Button fullWidth variant="outlined" color="secondary">Poista</Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        onClick={event => openPrice(event.currentTarget, row.id)}
                                    >
                                        Myyntiin
                                     </Button>
                                </ExpansionPanelActions>
                            </ExpansionPanel>

                        )
                    })}
                </InfiniteScroll>
            </div>

            {states.ids.length > 0
                ? <SpeedDial
                    ariaLabel="SpeedDial openIcon example"
                    className={classes.add} hidden={states.hidden}
                    icon={<EditIcon />}
                    onMouseLeave={handleCloseSpeedDial}
                    onOpen={handleOpenSpeedDial}
                    open={states.openSpeedDial}
                >
                    <SpeedDialAction
                        tooltipTitle={"Myy valitut"}
                        icon={<EuroIcon />}
                        onClick={event => { openPrice(event.currentTarget) }}
                    />
                    <SpeedDialAction
                        tooltipTitle={"Poista valitut"}
                        icon={<DeleteIcon />}
                        onClick={openDeleteConfirm}
                    />

                </SpeedDial>
                : <Fab className={classes.add} color="primary" onClick={openNew}>
                    <SpeedDialIcon />
                </Fab>}

            {states.anchorElDelete ?
                <DeleteConfirm
                    handleClose={handleClose}
                    anchorEl={states.anchorElDelete}
                    ids={states.ids}
                    names={states.names}
                    title={"Haluatko varmasti poistaa"}
                    warning={"Olet poistamassa levyjä pysyvästi!"}
                    delete={deleteVinyl}
                // deleteArtists={deleteArtists}
                />
                : null}
            {states.anchorElPrice ? <AskPrice names={states.names} client={props.client} anchorEl={states.anchorElPrice} handleClose={handleClose} ids={states.ids} /> : null}
            {states.openNew ? <NewVinyl open={states.openNew} handleClose={handleClose} setData={setData} data={data} /> : null}
        </div>
    )
})

export default withApollo(Vinyls)

function AskPrice(props) {
    const open = Boolean(props.anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [price, setPrice] = React.useState('')


    const handlePrice = event => {
        setPrice(event.target.value)
    }

    const addForSale = () => {
        props.client.mutate({
            mutation: ADD_TO_FORSALE,
            variables: {
                vinyls: props.ids,
                price: price
            }
        })
            .then(res => {
                console.log('froSale res', res.data.createForSale.forSale)
                props.handleClose()
            })
            .catch(e => console.log(e))
    }



    console.log('pop', props.ids)
    return (

        <Popover
            open={open}
            id={id}
            anchorEl={props.anchorEl}
            onClose={props.handleClose}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
        >
            <Grid container style={{ padding: 15, textAlign: 'center', maxWidth: 500 }}>
                <Grid item xs={12}>
                    <Alert severity="warning" style={{ textAlign: 'center' }} >
                        <strong>Olet myymässä seuraavia levyjä:</strong>
                    </Alert>
                </Grid>
                {props.names.map(name => {
                    return (
                        <Grid item xs={12} key={name}>
                            <Typography variant="subtitle1">
                                {name}
                            </Typography>
                        </Grid>
                    )
                })}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        label="hinta levyille"
                        onChange={handlePrice}
                    />
                </Grid>
                <br />
                <Grid item xs={6}>
                    <Button
                        variant="outlined"
                        fullWidth
                        color="primary"
                        disabled={price.length === 0}
                        onClick={addForSale}
                    >

                        Vahvista
                      </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        onClick={props.handleClose}
                        color="secondary"
                        variant="outlined"
                        fullWidth
                    >
                        Peruuta
                      </Button>
                </Grid>
            </Grid>

        </Popover>
    )
}