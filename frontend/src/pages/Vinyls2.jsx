import React from 'react'
import { withApollo } from 'react-apollo'
import { ALL_VINYLS } from '../graphql/resolvers/queries';
import { withStyles, Card, CardContent, Typography, Grid, FormControlLabel, Checkbox, TextField, Select, MenuItem, Fab, Button } from '@material-ui/core';
import helpers from '../helpers';
import LoadingSpinner from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import EuroIcon from '@material-ui/icons/EuroSymbol';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteConfirmation from '../components/DeleteConfirm2';
import { DELETE_VINYLS } from '../graphql/resolvers/mutations';
import AskPrice from '../components/AskPrice';
import NewVinyl from '../components/NewVinyl';
import VinylsImage from '../pictures/vinyls-logo.jpg'
//import Background from '../pictures/background3.png'
import Loading from '../components/Loading'
import AddImage from '../components/AddImage';

const styles = theme => ({
    root: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        //  backgroundColor: 'black'
    },
    right: {
        textAlign: 'right',
        paddingRight: theme.spacing(3)
    },
    center: {
        textAlign: 'center'
    },
    left: {
        paddingLeft: theme.spacing(3)

    },
    infiniteScroll: {
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
        [theme.breakpoints.up('md')]: {
            width: '40%'
        },
        [theme.breakpoints.down('md')]: {
            width: '55%'
        }
    },
    card: {
        //    backgroundImage: `url(${Background})`,
        borderRadius: 10,
        minHeight: 500
    },
    ///////edit 
    vinylImage: {
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '70%',
        }
        //  border: '1px solid lightGray'

    }


})
class Vinyls extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this)
        this.deleteVinyl = this.deleteVinyl.bind(this)
        this.handleChange = this.handleChange.bind(this)

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
        openNew: false,
        openAddImage: false,
        file: null,
        fileID: null,

    };

    componentDidMount() {
        this.fetchData()

    }

    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }
    // *************** FETCHING ********************

    fetchData(filter) {
        const { sortBy } = this.state
        this.props.client.query({
            query: ALL_VINYLS,
            variables: {
                first: 30,
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
    handleOpenAddImage = id => {
        this.setState({ openAddImage: true, fileID: id })
    }
    handleClose = () => {
        this.setState({
            openSpeedDial: false,
            openDeleteConfirm: false,
            openAskPrice: false,
            openNew: false,
            openAddImage: false,
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

    renderImage = (id, url) => {
        const { data } = this.state
        let tempVinyls = {}
        tempVinyls = data.map(row => {
            if (row.id === id) {
                let temp = {}
                temp = { ...row, image: url }
                return temp
            }
            return row
        })

        this.setState({ data: tempVinyls })
    }

    // *************** RENDER ********************
    render() {
        const { data, loading, ids, names, sortBy, hasMore, openSpeedDial, openDeleteConfirm, openAskPrice, openNew } = this.state
        const { classes } = this.props;
        console.log('vinyls2')
        return (

            <div className={classes.root}>
                <Loading open={loading} />

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

                    <div className={classes.center} style={{ overflow: 'hidden', width: '100%', backgroundColor: 'black' }}>
                        <Typography variant="h2" style={{ color: 'white' }}>
                            VINYYLIT
                        </Typography>
                        <img className={classes.image} src={VinylsImage} alt="Vinyls" />
                    </div>
                    <div
                        style={{
                            position: 'sticky',
                            top: 0,
                            width: '100%',
                            backgroundColor: 'white',
                            height: 55,
                            zIndex: 1
                        }}
                    >
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={6} className={classes.left}>
                                <TextField
                                    variant="outlined"
                                    placeholder="Search..."
                                    margin="dense"
                                    onChange={this.handleSearch}
                                    fullWidth
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
                            margin: 'auto',
                            padding: 10
                        }} >

                        {data.map((vinyl, i) => {
                            const id = vinyl.id
                            const backColor = vinyl.forSale ? 'green' : '#fff'
                            return (
                                <Grid item xs={12} md={6} xl={4} key={i}>
                                    <Card elevation={7} className={classes.card}>

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


                                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                                    {vinyl.image && <img src={vinyl.image} className={classes.vinylImage} alt="vinyl" />}

                                                    {!vinyl.image
                                                        ? <div style={{ paddingTop: 87, paddingBottom: 87 }}>
                                                            <Button variant="contained" onClick={() => this.handleOpenAddImage(id)}>
                                                                Lisää kuva
                                                        </Button>
                                                        </div>

                                                        : vinyl.image === "https://ladatutkuvat.s3.eu-north-1.amazonaws.com/noImage.png"

                                                            ? <Button fullWidth variant="contained" onClick={() => this.handleOpenAddImage(id)}>
                                                                Lisää kuva
                                                                </Button>
                                                            : <div style={{ height: 36 }} />

                                                    }
                                                </Grid>

                                                <Grid item xs={12} style={{ height: 1, borderBottom: '1px solid grey', marginTop: 10, marginBottom: 10 }} />

                                                <Grid item xs={6}>

                                                    <Typography gutterBottom variant="subtitle1" className={classes.center}>
                                                        {vinyl.type}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Typography gutterBottom variant="subtitle1" className={classes.center}>
                                                        {1950 + i}
                                                    </Typography>
                                                </Grid>


                                                <Grid item xs={6}>

                                                    <Typography gutterBottom variant="subtitle1" className={classes.center}>
                                                        Levyn kunto: {vinyl.condition}
                                                    </Typography>
                                                </Grid>


                                                <Grid item xs={6}>

                                                    <Typography gutterBottom variant="subtitle1" className={classes.center}>
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

                {
                    ids.length > 0
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
                        </Fab>
                }

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
                <AddImage open={this.state.openAddImage} renderImage={this.renderImage} handleClose={this.handleClose} id={this.state.fileID} />
            </div >

        )
    }
}



export default withStyles(styles)(withApollo(Vinyls))

