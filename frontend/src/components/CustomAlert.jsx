import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const style = makeStyles(theme => ({
    root: {
        margin: 0,
        textAlign: 'center'
    },
    button: {
        width: 200
    },
    msg: {
        width: 300
    }

}))

export default function CustomAlert(props) {
    const classes = style()
    return (
        <Alert
            className={classes.root}
            severity={props.status}
            action={
                props.status === "success"
                    ? <Link to="/login">Kirjaudu sisään</Link>
                    : <Button className={classes.button} onClick={props.reset}>Yritä uudelleen</Button>}
        >
            <AlertTitle>{props.msg}</AlertTitle>
            <div className={classes.msg}>
                {props.error}
            </div>
        </Alert>
    )
}