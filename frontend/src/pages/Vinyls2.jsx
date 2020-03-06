import React from 'react'
import { withApollo } from 'react-apollo'
import { ALL_VINYLS } from '../graphql/resolvers/queries';
import { withStyles, Card, CardContent, Typography, Grid, FormControlLabel, Checkbox, TextField, Select, MenuItem, Fab, } from '@material-ui/core';
import Moment from 'react-moment';
import helpers from '../helpers';
import LoadingSpinner from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import EuroIcon from '@material-ui/icons/EuroSymbol';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteConfirm from '../components/DeleteConfirm';
import EditIcon from '@material-ui/icons/Edit';
import DeleteConfirmation from '../components/DeleteConfirm2';
import { DELETE_VINYLS } from '../graphql/resolvers/mutations';
import AskPrice from '../components/AskPrice';
import NewVinyl from '../components/NewVinyl';
import VinylsImage from '../pictures/vinyls-logo.jpg'


const styles = theme => ({
    root: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 8,

    },
    right: {
        textAlign: 'right'
    },
    center: {
        textAlign: 'center'
    },
    infiniteScroll: {
        padding: theme.spacing(1),
        margin: 0,
        padding: 0
    },
    add: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        // color: 'green'
    },
    image: {
        [theme.breakpoints.up('sm')]: {
            width: '50%'
        },

        [theme.breakpoints.down('xs')]: {
            width: '65%'
        }
    }

})
class Vinyls extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this)
        this.deleteVinyl = this.deleteVinyl.bind(this)
        // this.updateSale = this.updateSale(this)
    }

    state = {
        data: [],
        loading: true,
        hasMore: true,
        names: [],
        ids: [],

        sortBy: "createdAt_DESC",
        filter: '',

        openSpeedDial: false,
        openDeleteConfirm: false,
        openAskPrice: false,
        openNew: false

    };

    componentDidMount() {
        this.fetchData()
    }

    // *************** FETCHING ********************

    fetchData(filter) {
        const { sortBy } = this.state
        console.log('FETCH', sortBy)
        this.props.client.query({
            query: ALL_VINYLS,
            variables: {
                first: 15,
                sortBy: sortBy,
                filter: filter
            },
        })
            .then(res => {
                const data = res.data.allVinyls
                if (data.length > 0)
                    this.setState({ data: data, loading: false })

            })
            .catch(e => console.log(e))
    }

    onFetchMore = () => {
        const { sortBy, data, filter } = this.state
        this.props.client.query({
            query: ALL_VINYLS,
            variables: {
                first: 15,
                after: data[data.length - 1].id,
                sortBy: sortBy,
                filter: filter
            }
        })
            .then(res => {

                let temp = data.slice()
                const data2 = res.data.allVinyls
                console.log(data2)
                temp.push(...data2)
                this.setState({ data: temp })
                if (data2.length === 0)
                    this.setState({ hasMore: false })
            })
            .catch(e => console.log(e))
    }

    // *************** DATA FINDING ********************

    handleSearch = ({ target: { value } }) => {
        /*  let newList = data.allArtists.filter(filter => {
              return filter.name.toLowerCase().includes(value)
          })*/
        if (value.length >= 3) {
            this.fetchData(value)
            this.setState({ filter: value })
        }
        else {
            this.fetchData()
        }

    }
    handleCheckBox = (id, name) => {
        const { names, ids } = this.state

        const currentIndexId = ids.indexOf(id);
        const currentIndexNames = names.indexOf(id);

        const newCheckedIds = [...ids];
        const newCheckedNames = [...names];

        if (currentIndexId === -1) {
            newCheckedIds.push(id);
            newCheckedNames.push(name)
        } else {
            newCheckedIds.splice(currentIndexId, 1);
            newCheckedNames.splice(currentIndexNames, 1);

        }

        this.setState({ names: newCheckedNames, ids: newCheckedIds })
    }

    handleSort = async event => {
        await this.setState({ sortBy: event.target.value })
        this.fetchData()
    }

    // *************** OPEN FUNCTIONS ********************

    handleOpenSpeedDial = () => {
        this.setState({ openSpeedDial: true })
    }
    handleCloseSpeedDial = () => {
        this.setState({ openSpeedDial: false })
    }

    handleOpenDeleteConfirm = () => {
        this.setState({ openDeleteConfirm: true })
    }

    handleOpenAskPrice = () => {
        this.setState({ openAskPrice: true })
    }
    handleOpenNew = () => {
        this.setState({ openNew: true })
    }
    handleClose = () => {
        this.setState({
            openSpeedDial: false,
            openDeleteConfirm: false,
            openAskPrice: false,
            openNew: false,
            ids: [],
            names: []
        })
    }

    deleteVinyl = () => {
        const { ids, data } = this.state
        console.log('DELETE VINYL', ids)

        this.props.client.mutate({
            mutation: DELETE_VINYLS,
            variables: {
                ids: ids
            }
        })
            .then(res => {
                console.log(res.data)
                const data2 = data
                ids.forEach(rowId => {
                    const index = data2.findIndex(row => row.id === rowId);
                    if (index > -1) {
                        data2.splice(index, 1);
                    }
                });

                this.setState({ data: data2 })
                this.handleClose()

            })
            .catch(e => console.log(e))
    }

    getIndex(value, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    updateSale = () => {
        const { data, ids } = this.state
        let tempData = [...data]
        ids.forEach(row => {
            const i = this.getIndex(row, data)
            tempData[i] = { ...tempData[i], forSale: true }
        })

        this.setState({ data: tempData })
        this.handleClose()
    }

    addNew = (newData) => {
        console.log('newData', newData)
        const data = [...newData, ...this.state.data]
        this.setState({ data: data })
        this.handleClose()
    }

    // *************** RENDER ********************
    render() {
        const { data, loading, ids, names, sortBy, hasMore, openSpeedDial, openDeleteConfirm, openAskPrice, openNew } = this.state
        const { classes } = this.props;
        console.log('vinyls2', sortBy)
        if (loading) return <div>LOADING...</div>
        return (

            <div className={classes.root}>
                <InfiniteScroll
                    className={classes.infiniteScroll}
                    height={'calc(100vh - 65px)'}
                    dataLength={data.length}
                    next={this.onFetchMore}
                    hasMore={hasMore}
                    loader={<div style={{ textAlign: 'center' }}><LoadingSpinner /></div>}
                    endMessage={
                        <Typography variant="h6">
                            Jee, kaikki artistit on jo listattu
                        </Typography>
                    }
                >

                    <div className={classes.center} style={{ overflow: 'hidden', backgroundColor: 'black', width: '100%' }}>
                        <Typography variant="h2">
                            VINYYLIT
                        </Typography>
                        <img className={classes.image} src={VinylsImage} />
                    </div>
                    <div
                        style={{
                            position: '-webkitSticky',
                            position: 'sticky',
                            top: 0,
                            width: '100%',
                            backgroundColor: 'black',
                            height: 55,
                            zIndex: 1
                        }}
                    >
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    placeholder="Search..."
                                    margin="dense"
                                    onChange={this.handleSearch}

                                />
                            </Grid>

                            <Grid item xs={6} className={classes.right}>
                                <Select
                                    value={sortBy}
                                    onChange={this.handleSort}
                                >
                                    <MenuItem value={"createdAt_DESC"}>Uusin (lisätty)</MenuItem>
                                    <MenuItem value={"createdAt_ASC"}>Vanhin (lisätty)</MenuItem>
                                    <MenuItem value={"year_ASC"}>Vanhin levy</MenuItem>
                                    <MenuItem value={"year_DESC"}>Uusin levy</MenuItem>
                                    <MenuItem value={"name_ASC"}>Nimi (a-ö)</MenuItem>
                                    <MenuItem value={"name_DESC"}>Nimi (ö-a)</MenuItem>
                                    <MenuItem value={"forSale_DESC"}>Myynnissä</MenuItem>

                                </Select>
                            </Grid>
                        </Grid>
                    </div>
                    <Grid container spacing={2} justify="center" alignItems="center"
                        style={{
                            width: '100%',
                            margin: 'auto   '

                        }} >

                        {data.map((vinyl, i) => {
                            const backColor = vinyl.forSale ? 'green' : '#fff'
                            return (
                                <Grid item xs={12} md={6} xl={4} key={i}>
                                    <Card elevation={7} >
                                        <CardContent>
                                            <Grid container justify="center" alignItems="center" >

                                                {vinyl.forSale &&
                                                    <Grid item xs={12} className={classes.center}>
                                                        <Typography variant="h6" style={{ color: backColor }}>
                                                            Myynnissä
                                                    </Typography>
                                                    </Grid>}
                                                <Grid item xs={1} style={{ padding: 10 }}>
                                                    <FormControlLabel
                                                        onClick={() => {
                                                            this.handleCheckBox(vinyl.id, vinyl.name)
                                                        }}
                                                        control={<Checkbox checked={ids.indexOf(vinyl.id) !== -1} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={11} style={{ padding: 10 }}>
                                                    <Typography gutterBottom variant="h6">
                                                        <strong>{vinyl.name}</strong>
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} style={{ height: 1, borderBottom: '1px solid grey', marginTop: 10, marginBottom: 10 }} />

                                                <Grid item xs={6}>

                                                    <Typography gutterBottom variant="subtitle2" className={classes.center}>
                                                        {vinyl.type}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Typography gutterBottom variant="subtitle2" className={classes.center}>
                                                        {1950 + i}
                                                    </Typography>
                                                </Grid>


                                                <Grid item xs={6}>

                                                    <Typography gutterBottom variant="subtitle2" className={classes.center}>
                                                        Levyn kunto: {vinyl.condition}
                                                    </Typography>
                                                </Grid>


                                                <Grid item xs={6}>

                                                    <Typography gutterBottom variant="subtitle2" className={classes.center}>
                                                        Kategoria: {vinyl.category.name}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} style={{ height: 1, borderBottom: '1px solid grey', marginTop: 10, marginBottom: 10 }} />

                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        <b>Artistit: </b>
                                                        {vinyl.artists.map((artist, i) => {
                                                            const name = helpers.Capitalize(artist.firstName) + " " + helpers.Capitalize(artist.lastName)
                                                            const a = i + 1 === vinyl.artists.length ? name : name + ", "
                                                            return a

                                                        })}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </InfiniteScroll>

                {ids.length > 0
                    ? <SpeedDial
                        ariaLabel="SpeedDial openIcon example"
                        className={classes.add}
                        icon={<EditIcon />}
                        onMouseLeave={this.handleCloseSpeedDial}
                        onOpen={this.handleOpenSpeedDial}
                        open={openSpeedDial}
                    >
                        <SpeedDialAction
                            tooltipTitle={"Myy valitut"}
                            icon={<EuroIcon />}
                            onClick={this.handleOpenAskPrice}
                        />
                        <SpeedDialAction
                            tooltipTitle={"Poista valitut"}
                            icon={<DeleteIcon />}
                            onClick={this.handleOpenDeleteConfirm}
                        />

                    </SpeedDial>
                    : <Fab className={classes.add} color="primary" onClick={this.handleOpenNew}>
                        <SpeedDialIcon />
                    </Fab>}

                <DeleteConfirmation
                    open={openDeleteConfirm}
                    handleClose={this.handleClose}
                    names={names}
                    title={"Haluatko varmasti poistaa seuraavat levyt"}
                    warning={"Olet poistamassa levyjä pysyvästi!"}
                    delete={this.deleteVinyl}
                />

                <AskPrice
                    open={openAskPrice}
                    handleClose={this.handleClose}
                    names={names}
                    ids={ids}
                    update={this.updateSale}
                />

                <NewVinyl open={openNew} handleClose={this.handleClose} addNew={this.addNew} />
            </div>

        )
    }
}



export default withStyles(styles)(withApollo(Vinyls))

