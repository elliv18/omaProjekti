import React from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import TextyAnim from 'rc-texty'

export default function DeleteConfirmation(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >

            <DialogContent>
                <Alert severity="warning">
                    <AlertTitle>
                        <strong>{props.title}?</strong>
                        {props.names.map(name => {
                            return <p key={name}>{name}</p>
                        })}

                    </AlertTitle>
                    <TextyAnim style={{ color: 'red' }}>
                        {props.warning}
                    </TextyAnim>
                </Alert>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" color="primary" onClick={props.delete}>
                    Vahvista
                </Button>
                <Button variant="contained" color="secondary" onClick={props.handleClose}>
                    Peruuta
                </Button>
            </DialogActions>
        </Dialog>
    )
}