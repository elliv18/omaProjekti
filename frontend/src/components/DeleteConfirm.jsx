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
    console.log('confirm', props)
    const open = Boolean(props.anchorEl);
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
            anchorEl={props.anchorEl}
            onClose={props.handleClose}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
        >
            <Alert
                severity="warning"
            >

                <AlertTitle>
                    <strong>{props.title}?</strong>
                    {props.names.map(name => {
                        return <p key={name}>{name}</p>
                    })}

                </AlertTitle>
                <TextyAnim style={{ color: 'red' }}>
                    {props.warning}
                </TextyAnim>
                <hr />
                <Grid container>
                    <Grid item xs={6}>
                        <Button variant="outlined" fullWidth color="primary" disabled={disabled}
                            onClick={() => {
                                props.delete(props.ids)
                                props.handleClose()
                            }}
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