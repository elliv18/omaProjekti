import React from 'react'
import { Backdrop, makeStyles } from '@material-ui/core';
import LoadingSpinner from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        marginTop: 56
    },
}));

export default function Loading(props) {
    const classes = useStyles();

    return (
        <div>
            <Backdrop className={classes.backdrop} open={props.open} >
                <LoadingSpinner />
            </Backdrop>
        </div>
    );
}