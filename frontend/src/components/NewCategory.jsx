import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, makeStyles } from '@material-ui/core'
import Select from 'react-select'
import { withApollo } from 'react-apollo'
import { ALL_ARTISTS, ALL_CATEGORIES } from '../graphql/resolvers/queries'
import helpers from '../helpers'
import { ADD_VINYL, ADD_CATEGORY } from '../graphql/resolvers/mutations'

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
function NewCategory(props) {
    const classes = styles()
    const [name, setName] = React.useState('')

    const handleNameChange = event => {
        setName(event.target.value)
    }



    const addCategory = async () => {
        props.client.mutate({
            mutation: ADD_CATEGORY,
            variables: {
                name: name
            }
        })
            .then(res => {
                const data = res.data.createCategory.category
                const temp = [
                    { id: data.id, name: data.name, vinyls: [] }
                ]

                props.setData([...temp, ...props.data])
                props.handleClose()
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
                <DialogTitle>Lisää uusi categoria</DialogTitle>
                <DialogContent className={classes.dialogPaper}>
                    <form>

                        <TextField margin="dense" label="Kategorian nimi" fullWidth variant="outlined" onChange={handleNameChange} />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={addCategory}>
                        Lisää
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={props.handleClose}>
                        Peruuta
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default withApollo(NewCategory)