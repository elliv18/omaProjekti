import React from 'react'
import { withApollo } from 'react-apollo'
import { ALL_CATEGORIES } from '../graphql/resolvers/queries'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Typography, Tooltip, TextField, Grid, Select, makeStyles, MenuItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelActions, Button, ExpansionPanelDetails, Collapse, IconButton } from '@material-ui/core'
import LoadingSpinner from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Moment from 'react-moment';
import Loading from '../components/Loading'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NewCategory from '../components/NewCategory'

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
        left: 16,
        color: 'green'
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
    }

}))


const Categories = React.memo(function Categories(props) {

    const [data, setData] = React.useState([])
    const [showVinyls, setSowVinyls] = React.useState(false)
    const [sortBy, setSortBy] = React.useState('createdAt_DESC')
    const [open, setOpen] = React.useState({
        new: false,
        data: []
    })

    const [hasMore, setHasMore] = React.useState(true)

    const classes = styles()

    const fetch = React.useCallback((filter, sortBy) => {
        props.client.query({
            query: ALL_CATEGORIES,
            variables: {
                sortBy: sortBy,
                first: 20,
                filter: filter,
            }
        })
            .then(res => {
                console.log(res.data)
                setData(res.data.allCategories)
            })
            .catch(e => console.log(e))
    }, [props.client])

    React.useEffect(() => {
        fetch()

    }, [fetch])




    const handleShow = () => {
        setSowVinyls(!showVinyls)
    }

    const openNew = () => {
        setOpen({ new: true })
    }
    const closeNew = () => {
        setOpen({ new: false })
    }

    const handleSort = event => {
        setSortBy(event.target.value)
        fetch("", event.target.value)

    }


    const onFetchMore = () => {
        console.log('MORE', sortBy)
        props.client.query({
            query: ALL_CATEGORIES,
            variables: {
                sortBy: sortBy,
                first: 30,
                after: data[data.length - 1].id,
            }
        })
            .then(res => {

                let temp = data.slice()
                const data2 = res.data.allCategories
                console.log(data2)
                temp.push(...data2)
                setData(temp)
                if (data2.length === 0)
                    setHasMore(false)
            })
            .catch(e => console.log(e))
    }
    if (data.length === 0) return <Loading open={true} />

    console.log('DATA', data)

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
                                // onChange={handleSearch}
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
                            Jee, kaikki  kategoriat on jo listattu
                        </Typography>
                    }
                >
                    {data.map((row, i) => {
                        return (
                            <ExpansionPanel elevation={3} key={i} className={classes.expansionPanel}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Grid container>
                                        <Grid item xs={12} md={2}>
                                            <Typography variant="h6" className={classes.center}>
                                                <strong>Categoria: </strong>
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={10}>
                                            <Typography variant="h6">
                                                {row.name + i}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>

                                    <Grid container justify="center" alignItems="center">
                                        <Grid item md={3} xs={12} >
                                            <Typography variant="subtitle2">
                                                <strong>Kategoria lisätty: </strong>
                                                <Moment format="DD-MM-YYYY HH:mm">
                                                    {row.createdAt}
                                                </Moment>
                                            </Typography>
                                        </Grid>

                                        <Grid item md={3} xs={12} >
                                            <Typography variant="subtitle2">
                                                <strong>Kategoria päivitetty: </strong>
                                                <Moment format="DD-MM-YYYY HH:mm">
                                                    {row.updatedAt}
                                                </Moment>
                                            </Typography>
                                        </Grid>
                                        <hr />
                                        <Grid item md={5} xs={12}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleShow}
                                            >
                                                Näytä levyt
                                            </Button>
                                        </Grid>
                                        <Collapse in={showVinyls}>
                                            {row.vinyls.map((vinyl, i) => {
                                                return (

                                                    <Grid item xs={12} key={i} className={classes.vinyls} >
                                                        <br />
                                                        <hr />
                                                        <Grid container justify="center" alignItems="baseline">
                                                            <Grid item xs={12} md={4}  >
                                                                <Typography variant="h6">
                                                                    <b>Levyn nimi: </b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={8}>
                                                                <Typography variant="subtitle1">
                                                                    {i + 1 === row.vinyls.length ? vinyl.name : vinyl.name + ", "}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item xs={6} md={4}>
                                                                <Typography variant="h6">
                                                                    <b>Levyn tyyppi</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} md={8}>
                                                                <Typography variant="h6">
                                                                    {vinyl.type}
                                                                </Typography>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>
                                                )
                                            })}
                                        </Collapse>
                                    </Grid>
                                </ExpansionPanelDetails>

                                <ExpansionPanelActions>
                                    <Button fullWidth variant="outlined" color="secondary">Poista</Button>
                                    <Button fullWidth variant="outlined" color="primary">Myyntiin</Button>
                                </ExpansionPanelActions>
                            </ExpansionPanel>

                        )
                    })}
                </InfiniteScroll>
            </div>
            <IconButton className={classes.add} onClick={openNew}>
                <AddCircleIcon fontSize="large" />
            </IconButton>

            {open.new ? <NewCategory open={open.new} handleClose={closeNew} setData={setData} data={data} /> : null}

        </div>
    )
})

export default withApollo(Categories)