import React from 'react'
import { Dialog, DialogContent, DialogTitle, FormControl, TextField, DialogActions, Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { withApollo } from 'react-apollo'
import { ADD_TO_FORSALE } from '../graphql/resolvers/mutations'

function AskPrice(props) {
    const [state, setState] = React.useState({
        name: '',
        desc: '',
        pricePcs: '',
        priceTotal: ''
    })

    const nameChange = ({ target: { value } }) => {
        setState({ ...state, name: value })
    }
    const descChange = ({ target: { value } }) => {
        setState({ ...state, desc: value })
    }
    const pricePcsChange = ({ target: { value } }) => {
        setState({ ...state, pricePcs: value })
    }
    const priceTotalChange = ({ target: { value } }) => {
        setState({ ...state, priceTotal: value })
    }


    const addForSale = () => {
        props.client.mutate({
            mutation: ADD_TO_FORSALE,
            variables: {
                vinyls: props.ids,
                pricePcs: state.pricePcs,
                priceTotal: state.priceTotal,
                isSale: true,
                name: state.name,
                description: state.desc
            }
        })
            .then(res => {
                console.log('add sale', res.data)
                props.update()
                //props.handleClose()
            })
            .catch(e => {
                //   const error = e.message.replace('GraphQL error:', '').trim()
                console.log(e)
            })
    }
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                <Alert severity="warning">
                    <AlertTitle>
                        <strong>Olet myymässä seuraavia levyjä!</strong>
                        {props.names.map(name => {
                            return <p key={name}>{name}</p>
                        })}
                    </AlertTitle>
                </Alert>
            </DialogTitle>
            <DialogContent>
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
                        onChange={pricePcsChange}
                    />
                    {props.ids.length > 1 && <TextField
                        variant="outlined"
                        margin="dense"
                        label="Hinta (kaikki)"
                        fullWidth
                        onChange={priceTotalChange}
                    />}
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" color="primary" onClick={addForSale} >
                    Vahvista
                </Button>
                <Button variant="contained" color="secondary" onClick={props.handleClose}>
                    Peruuta
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default withApollo(AskPrice)