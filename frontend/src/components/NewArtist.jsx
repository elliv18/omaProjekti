import React from 'react'
import { withApollo } from 'react-apollo'
import { Dialog, DialogContent, DialogTitle, FormControl, TextField, DialogActions, Button } from '@material-ui/core'
import { ADD_ARTIST } from '../graphql/resolvers/mutations'

function NewArtist(props) {

    const [states, setStates] = React.useState({
        firstName: '',
        lastName: ''
    })

    const canAdd = () => {
        return states.firstName.length > 0 && states.lastName.length > 0
    }

    const handleFirstName = ({ target: { value } }) => {
        setStates({ ...states, firstName: value })
    }
    const handleLastName = ({ target: { value } }) => {
        setStates({ ...states, lastName: value })
    }

    const addArtist = async () => {

        console.log('ADD', states.firstName, states.lastName)
        await props.client.mutate({
            mutation: ADD_ARTIST,
            variables: {
                firstName: states.firstName,
                lastName: states.lastName
            }
        })
            .then(res => {
                console.log(res.data)
                props.handleClose()
            })
            .catch(e => console.log(e))
    }

    const disabled = !canAdd()
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>Lisää uusi artisti</DialogTitle>

            <DialogContent>
                <FormControl>
                    <TextField label="etunimi" placeholder="etunimi" variant="outlined" onChange={handleFirstName} />
                    <br />
                    <TextField label="sukunimi" placeholder="sukunimi" variant="outlined" onChange={handleLastName} />
                </FormControl>

                <hr />

                <DialogActions>

                    <Button disabled={disabled} variant="outlined" color="primary" onClick={addArtist}>
                        Lisää
                </Button>
                    <Button variant="outlined" color="secondary" onClick={props.handleClose}>
                        Peruuta
                </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default withApollo(NewArtist)