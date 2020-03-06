import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, makeStyles, Switch, Typography, Collapse } from '@material-ui/core'
import Select from 'react-select'
import { withApollo } from 'react-apollo'
import { ALL_ARTISTS, ALL_CATEGORIES } from '../graphql/resolvers/queries'
import helpers from '../helpers'
import { ADD_VINYL, ADD_TO_FORSALE } from '../graphql/resolvers/mutations'

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
    dialogPaper: { overflow: 'visible' }

}))
function NewVinyl(props) {
    const classes = styles()

    const [artists, setArtists] = React.useState([{
        value: '', label: ''
    }])

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

    const fetchCategories = async (filter) => {
        await props.client.query({
            query: ALL_CATEGORIES,
            variables: {
                filter: filter,
                first: 10
            }
        })
            .then(res => {
                const data = res.data.allCategories
                console.log(data)
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

    const addVinyl = async () => {
        const { name, year, condition, category, artists, type, price, forSale } = newVinylStates
        await props.client.mutate({
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
                const data = res.data.createVinyl.vinyl

                if (newVinylStates.forSale) {
                    let tempVinyls = []
                    tempVinyls.push(data.id)
                    console.log('** ON SALE **', tempVinyls)
                    props.client.mutate({
                        mutation: ADD_TO_FORSALE,
                        variables: {
                            price: price,
                            vinyls: tempVinyls
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

                props.addNew(temp)
                //props.handleClose()
            })
            .catch(e => console.log(e))
    }



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

                        <Select placeholder="Levyn tyyppi" options={types} onChange={handleTypeChange} />
                        <br />
                        <TextField margin="dense" label="Levyn nimi" fullWidth variant="outlined" onChange={handleNameChange} />
                        <br />
                        <br />
                        <Select placeholder="Levyn kunto" options={conditions} onChange={handleConditionChange} />
                        <br />
                        <Select placeholder="Levyn vuosi" options={years} onChange={handleYearChange} />
                        <br />

                        <Select
                            isMulti
                            placeholder="Artisti(t)"
                            options={artists}
                            onChange={handleArtistChange}
                            onInputChange={handleArtistInput}
                        />
                        <br />

                        <Select
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

                            <TextField margin="dense" label="Levyn hinta" fullWidth variant="outlined" onChange={handlePriceChange} />
                        </Collapse>

                    </form>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" color="primary" onClick={addVinyl}>
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