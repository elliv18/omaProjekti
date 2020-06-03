import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, makeStyles, Switch, Typography, Collapse, FormControl } from '@material-ui/core'
import Select from 'react-select'
import { withApollo } from 'react-apollo'
import { ALL_ARTISTS, ALL_CATEGORIES } from '../graphql/resolvers/queries'
import helpers from '../helpers'
import API from '../services/api'

const styles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
    },
    dialog: {
        height: 500,
        width: '80%'
    },
    form: {
        overflow: 'auto'
    },
    dialogPaper: { overflow: 'visible' },
    nameBox: {
        border: '0.3px solid lightGrey'
    },
    left: {
        textAlign: 'left'
    }
}))

const customStyles = {
    control: (base, state) => ({
        ...base,
        // background: "grey",
        // match with the menu
        // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        // Overwrittes the different states of border
        /*  borderColor: state.isFocused ? "yellow" : "green",
          // Removes weird border around container
          boxShadow: state.isFocused ? null : null,
          "&:hover": {
              // Overwrittes the different states of border
              borderColor: state.isFocused ? "red" : "blue"
          }*/

    }),

    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        //  backgroundColor: 'black',
        //color: '#007b80'
    }),
}
function NewVinyl(props) {
    const classes = styles()

    const [artists, setArtists] = React.useState([{
        value: '', label: ''
    }])

    const [state, setState] = React.useState({
        name: '',
        desc: '',
        price: '',
    })

    const [categories, setCategories] = React.useState([])

    const [newVinylStates, setNewVinylStates] = React.useState({
        name: '',
        type: '',
        condition: '',
        year: '',
        artists: [],
        category: '',
        price: '',
        forSale: false
    })
    const conditions = [
        { value: 'POOR', label: 'HUONO' },
        { value: 'OKAY', label: 'OK' },
        { value: 'GOOD', label: 'HYVÄ' },
        { value: 'EXCELLENT', label: 'TÄYDELLINEN' }
    ]
    const types = [

        { value: 'LP', label: 'LP' },
        { value: 'SINGLE', label: 'SINGLE' },
        { value: 'SAVIKIEKKO', label: 'SAVIKIEKKO' },
    ]

    let years = []

    React.useEffect(() => {
        const year = 2000;
        const tempYears = Array.from(new Array(100), (val, index) => year - index);
        tempYears.map((row, i) => years.push({ label: row, value: row }))


    })

    const fetchArtists = async (filter, first) => {
        await props.client.query({
            query: ALL_ARTISTS,
            variables: {
                filter: filter,
                first: first
            },
        })
            .then(res => {
                const data = res.data.allArtists
                console.log(data)
                let editedArtists = []
                data.forEach(row => {
                    const name = helpers.Capitalize(row.firstName) + " " + helpers.Capitalize(row.lastName)
                    editedArtists.push({ label: name, value: row.id })
                })
                setArtists(editedArtists)
            })
    }

    const fetchCategories = (filter) => {
        props.client.query({
            query: ALL_CATEGORIES,
            variables: {
                filter: filter,
                first: 10
            }
        })
            .then(res => {
                const data = res.data.allCategories
                //  console.log(data)
                let editetCategories = []
                data.map(row => (
                    editetCategories.push({ label: row.name, value: row.id })
                ))
                setCategories(editetCategories)
            })
            .catch(e => console.log(e))

    }

    const handleNameChange = event => {
        setNewVinylStates({ ...newVinylStates, name: event.target.value })
    }
    const handleYearChange = event => {
        setNewVinylStates({ ...newVinylStates, year: event.value })
    }
    const handleTypeChange = event => {
        setNewVinylStates({ ...newVinylStates, type: event.value })
    }

    const handleConditionChange = event => {
        setNewVinylStates({ ...newVinylStates, condition: event.value })
    }

    const handleForSaleChange = event => {
        setNewVinylStates({ ...newVinylStates, forSale: event.target.checked })
    }

    const handlePriceChange = event => {
        setNewVinylStates({ ...newVinylStates, price: event.target.value })

    }
    const handleArtistChange = event => {
        let editedArtists = []
        event ? event.map(row => (
            editedArtists.push(row.value)
        )) : editedArtists = []
        setNewVinylStates({ ...newVinylStates, artists: editedArtists })
    }
    const handleArtistInput = event => {
        if (event.length > 1)
            fetchArtists(event, 20)

        setArtists([])

    }

    const handleCategoryInput = event => {
        fetchCategories(event, 10)
    }

    const handleCategoryChange = event => {
        setNewVinylStates({ ...newVinylStates, category: event.value })
    }

    const nameChange = ({ target: { value } }) => {
        setState({ ...state, name: value })
    }
    const descChange = ({ target: { value } }) => {
        setState({ ...state, desc: value })
    }
    const priceChange = ({ target: { value } }) => {
        setState({ ...state, pricePcs: value })
    }

    const { name, year, condition, category, type, price, forSale } = newVinylStates
    const addedArtists = props.artist ? props.artist : newVinylStates.artists

    return (
        <Dialog
            fullWidth
            open={props.open}
            onClose={props.handleClose}
            PaperProps={{ className: classes.dialogPaper }}
        >
            <div className={classes.root}>
                <DialogTitle>Lisää uusi levy</DialogTitle>
                <DialogContent className={classes.dialogPaper}>
                    <form>
                        <TextField margin="dense" label="Levyn nimi" fullWidth variant="outlined" onChange={handleNameChange} />
                        <br />
                        <br />
                        <Select styles={customStyles} placeholder="Levyn tyyppi" options={types} onChange={handleTypeChange} />

                        <br />
                        <Select styles={customStyles} placeholder="Levyn kunto" options={conditions} onChange={handleConditionChange} />
                        <br />
                        <Select styles={customStyles} placeholder="Levyn vuosi" options={years} onChange={handleYearChange} />
                        <br />

                        {props.artist
                            ? <div className={classes.nameBox}>
                                <Typography variant="subtitle1" className={classes.left}>
                                    Artisti: <b>{props.name}</b>
                                </Typography>
                            </div>
                            : <Select
                                styles={customStyles}
                                isMulti
                                placeholder="Artisti(t)"
                                options={artists}
                                onChange={handleArtistChange}
                                onInputChange={handleArtistInput}
                            />}
                        <br />

                        <Select
                            styles={customStyles}
                            placeholder="Category"
                            options={categories}
                            onChange={handleCategoryChange}
                            onInputChange={handleCategoryInput}
                        />
                        <br />

                        <Typography variant="h6">
                            Listaa myyntiin
                            <Switch
                                value={newVinylStates.forSale}
                                label="Myyntiin"
                                onChange={handleForSaleChange}
                            />
                        </Typography>
                        <Collapse in={newVinylStates.forSale}>

                            <FormControl fullWidth>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    label="Nimi myynnille"
                                    fullWidth
                                    onChange={nameChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    label="Kuvaus myynnille"
                                    fullWidth
                                    onChange={descChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    label="Hinta (kpl)"
                                    fullWidth
                                    onChange={priceChange}
                                />

                            </FormControl>
                        </Collapse>

                    </form>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => API.createVinyl(props.client, name, year, condition, category, addedArtists, type, state.price, forSale, state.name, state.desc, props.addNew)}>
                        Lisää
                    </Button>
                    <Button variant="contained" color="secondary" onClick={props.handleClose}>
                        Peruuta
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default withApollo(NewVinyl)