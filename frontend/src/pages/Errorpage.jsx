import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core';

const errorStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        top: 106,
        bottom: 50,
        right: 50,
        left: 50,
        textAlign: 'center',
        paddingTop: 50
    },
    text: {
        fontSize: 50
    }
}))


export default function ErrorPage(props) {
    const classes = errorStyles()
    return (
        <Paper elevation={7} className={classes.root}>
            <Typography variant="h2">
                <b>404</b> Page not found
            </Typography>
        </Paper>
    )
}