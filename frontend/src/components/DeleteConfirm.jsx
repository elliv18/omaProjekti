import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import TextyAnim from 'rc-texty'
import { Popover, Button, Grid } from '@material-ui/core';

/*
const styles2 = makeStyles(theme => ({
    popOver: {

    },
    buttonGrid: {
        padding: theme.spacing(2)
    },
    title: {
        padding: theme.spacing(2),
        backgroundColor: '#ebb42a',
        textAlign: 'center'
    }
}))*/

export default function DeleteConfirm(props) {
    const open = Boolean(props.states.anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [disabled, setDisabled] = React.useState(true)


    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDisabled(false)
        }, 4000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <Popover
            open={open}
            id={id}
            anchorEl={props.states.anchorEl}
            onClose={props.handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Alert
                severity="warning"
            >

                <AlertTitle>{props.title}<strong> {props.states.name}</strong> ?</AlertTitle>
                <TextyAnim style={{ color: 'red' }}>
                    Huom! Poistaminen poistaa myös kaikki tämän artistin levyt!
                </TextyAnim>
                <hr />
                <Grid container>
                    <Grid item xs={6}>
                        <Button variant="outlined" fullWidth color="primary" disabled={disabled}
                            onClick={() => props.deleteArtists(props.states.id)}
                        >
                            Vahvista
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" fullWidth color="secondary"
                            onClick={props.handleClose}

                        >
                            Peruuta
                        </Button>
                    </Grid>
                </Grid>
            </Alert>

        </Popover >
    )
}