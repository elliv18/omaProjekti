import React from 'react'
import { Dialog, DialogContent, List, ListItem } from '@material-ui/core'

const ShowDataDialog = React.memo(function ShowDataDialog(props) {

    console.log('Dialog', props.data)
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogContent>
                <List>
                    {props.data.map((row, i) => {
                        return (
                            <ListItem key={i}>
                                {row.name}
                            </ListItem>
                        )
                    })}
                </List>
            </DialogContent>
        </Dialog>
    )
})

export default ShowDataDialog